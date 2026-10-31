import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const model = process.env.OPENAI_MODEL || 'gpt-6-luna';

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false })); // Inline CSS/JS is used in the single-page prototype.
app.use(express.json({ limit: '20kb' }));
app.use('/api/', rateLimit({ windowMs: 60_000, limit: 15, standardHeaders: 'draft-8', legacyHeaders: false }));
app.use(express.static(path.join(__dirname, 'public')));

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const sharedInstructions = `You are ARISE, an educational assistant for school-level learners. ARISE means “Modern Minds, Rooted Souls.” Use age-appropriate, inclusive, encouraging language. Adapt explanations to the stated class level. Prefer familiar everyday examples without assuming a learner's location or background. Encourage curiosity, critical thinking, empathy, honesty, respect and responsibility. Values and spirituality content must be inclusive and non-coercive; never present one religion or belief as compulsory. Do not ask for or encourage sharing a student's name, address, phone number, school ID, passwords, precise location, photos or other personal information. If personal information is included, do not repeat it and remind the user not to share it. For health, legal, safety or other high-stakes topics, provide general educational information and recommend consulting a trusted adult or qualified professional. Do not generate humiliating, discriminatory, sexual, violent or age-inappropriate content. Never claim certainty where facts are uncertain. Identify curriculum-specific facts a teacher should verify. Do not claim to know a learner's grades or progress unless provided in the current request.`;

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}
function unavailable(res) {
  return res.status(503).json({ error: 'Generative AI is not configured. The project is running, but the owner must add an API key privately to the server environment.' });
}
async function askAI(instructions, input, maxOutputTokens) {
  return client.responses.create({ model, instructions, input, max_output_tokens: maxOutputTokens, store: false });
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(client), model: client ? model : null, service: 'ARISE' });
});

app.post('/api/generate', async (req, res) => {
  if (!client) return unavailable(res);
  const subject = clean(req.body.subject, 80) || 'General Studies';
  const level = clean(req.body.level, 40) || 'Class 8';
  const topic = clean(req.body.topic, 160);
  const objective = clean(req.body.objective, 500) || 'Understand the key ideas and connect them to everyday life.';
  const kind = clean(req.body.kind, 24);
  const language = clean(req.body.language, 40) || 'Simple English';
  const formats = {
    explain: 'A clear explanation with key terms, an example, and a short recap',
    examples: 'At least four accurate real-life examples with simple explanations',
    activity: 'A safe, inclusive, low-cost classroom activity with objective, time, materials, steps and reflection',
    assessment: 'A short quiz with multiple-choice and short-answer questions, answer key and brief explanations',
    lesson: 'A lesson plan with objectives, prior knowledge, materials, timed teaching sequence, checks for understanding and extension',
    worksheet: 'A printable worksheet with questions at graduated difficulty and a separate answer key',
    values: 'An inclusive reflection connecting the topic to empathy, responsibility, integrity or critical thinking without religious coercion'
  };
  if (!topic) return res.status(400).json({ error: 'Please enter a topic.' });
  if (!Object.hasOwn(formats, kind)) return res.status(400).json({ error: 'Please choose a valid resource type.' });
  try {
    const response = await askAI(sharedInstructions, `Create: ${formats[kind]}\nSubject: ${subject}\nClass/level: ${level}\nTopic: ${topic}\nLearning objective: ${objective}\nLanguage: ${language}\n\nUse clear headings and age-appropriate language. Do not invent curriculum citations. End with a short Teacher Review note describing facts or syllabus alignment that should be checked.`, 1400);
    res.json({ text: response.output_text || 'No text was returned. Please try again.' });
  } catch (error) {
    console.error('ARISE generation error:', error?.message || 'Unknown error');
    res.status(502).json({ error: 'The AI service could not complete this request. Please try again later.' });
  }
});

app.post('/api/chat', async (req, res) => {
  if (!client) return unavailable(res);
  const question = clean(req.body.question, 1000);
  const level = clean(req.body.level, 40) || 'Class 8';
  const subject = clean(req.body.subject, 80) || 'General learning';
  if (!question) return res.status(400).json({ error: 'Please type a learning question.' });
  try {
    const response = await askAI(`${sharedInstructions}\nYou are in ARISE doubt-solving mode. Explain step by step for ${level} level in ${subject}. Start with a direct, simple answer, explain the reasoning, then ask one short check-for-understanding question. If unclear, ask one concise clarification.`, question, 900);
    res.json({ text: response.output_text || 'I could not prepare an answer. Please rephrase your question.' });
  } catch (error) {
    console.error('ARISE chat error:', error?.message || 'Unknown error');
    res.status(502).json({ error: 'The AI assistant is temporarily unavailable. Please try again later.' });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }));
app.get(/.*/, (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(port, () => console.log(`ARISE server listening on port ${port}`));
