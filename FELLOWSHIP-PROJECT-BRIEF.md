# ARISE — Modern Minds, Rooted Souls
## AI Teacher Assistant and Values-Led Learning Platform

### 1. Project overview
ARISE is an educational technology prototype that explores how generative AI can reduce repetitive teacher preparation work and make learning explanations more accessible to school-level students. Its guiding idea is **Modern Minds, Rooted Souls**: use modern technology while nurturing curiosity, empathy, responsibility, integrity and thoughtful reflection.

### 2. Problem being addressed
Teachers often spend substantial time preparing explanations, examples, activities, worksheets and assessments. Learners may also need concepts explained at a different pace or in simpler language. A single static resource may not meet varied classroom needs.

### 3. Proposed solution
ARISE brings several teacher-support and learner-support workflows into one interface:
- Teacher Studio creates topic explanations, examples, activities, quizzes, lesson plans, worksheets and values reflections.
- AI Doubt Solver responds to student questions with step-by-step explanations adjusted to the selected class level.
- Learning Insights displays simple, local activity counts to help demonstrate use of the prototype.
- Values & Reflection provides inclusive prompts that connect learning to empathy, responsibility, integrity and critical thinking.

### 4. How generative AI is used
The browser sends a limited request to the Node.js backend. The backend calls the OpenAI Responses API using a server-side secret. The secret is never included in browser code. The model is instructed to use age-appropriate language, avoid coercive religious messaging, discourage sharing personal data, and flag curriculum details that require teacher verification.

### 5. Intended users
- Teachers who prepare learning resources for school-level classes.
- Students who want a simple explanation of a subject concept.
- Education organisations exploring responsible, values-led uses of generative AI.

### 6. Expected value (to be validated)
- Reduce time spent drafting first versions of teaching materials.
- Offer multiple explanation formats for the same topic.
- Encourage student curiosity and independent questioning.
- Make values-based reflection a visible part of learning.

These are intended outcomes, not measured results. A pilot with teacher feedback and learner usability testing is needed before making impact claims.

### 7. Responsible design
- No student sign-up or identity fields in this prototype.
- Do not enter names, contact details, school IDs, precise locations or sensitive student information.
- Activity counts remain in the current browser; they are not grades or validated learning analytics.
- AI responses require teacher review.
- Values and spirituality content is inclusive and does not prescribe a religion or belief.
- The project is a prototype and is not a replacement for teachers, curriculum authorities or professional advice.

### 8. Current scope and limitations
The included source provides a browser interface and a Node.js API backend for AI resource generation and doubt-solving. Real AI use requires a configured API key and deployment on a Node-compatible host. It does not yet include user authentication, school/LMS integration, a verified curriculum knowledge base, formal learning outcome measurement or large-scale classroom validation.

### 9. Roadmap
**Phase 1 — Prototype:** Build and test core teacher and learner workflows.  
**Phase 2 — Teacher feedback:** Conduct a small, supervised usability pilot; gather feedback without collecting unnecessary student personal data.  
**Phase 3 — Curriculum alignment:** Add teacher-reviewed curriculum mappings and source references for selected subjects/classes.  
**Phase 4 — Accessibility and language:** Improve mobile usability, accessibility and regional-language quality with human review.  
**Phase 5 — Evaluation:** Measure teacher preparation time, usability and learner comprehension using an approved, privacy-conscious evaluation design.

### 10. Fellowship demonstration
Demonstrate the project using a sample topic such as “Water Conservation”: generate a Class 8 explanation, create a short quiz, ask the doubt solver one question, and finish with a values reflection about responsible use of water. Explain that AI output is a draft and the teacher remains the final reviewer.
