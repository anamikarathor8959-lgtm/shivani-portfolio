# ARISE — AI Teacher Assistant

**Tagline:** Modern Minds, Rooted Souls  
**Project type:** Full-stack educational technology prototype  
**Status:** Fellowship-ready source package; live AI requires private API configuration and deployment.

ARISE is designed to support teachers with lesson preparation and give school-level learners an approachable, age-adapted way to explore concepts. It combines generative AI with inclusive values-led reflection.

## What is included

- **Teacher Studio:** AI-generated explanations, real-life examples, classroom activities, quizzes with answer keys, lesson plans, worksheets and values reflections.
- **AI Doubt Solver:** Step-by-step explanations adapted to a selected school class and subject.
- **Learning Insights:** Local browser-only activity counters. These are not grades or validated learning outcomes.
- **Values & Reflection:** Inclusive prompts around curiosity, empathy, responsibility, integrity and reflection.
- **Secure backend:** Node.js/Express server; API key is read only from a private server environment variable.
- **Basic protections:** Request-size limit, API rate limit, Helmet security headers, input length checks and no student account system.

## Project structure

```text
ARISE-Fellowship-Release/
├── public/
│   └── index.html
├── server.js
├── package.json
├── render.yaml
├── .env.example
├── .gitignore
├── README.md
├── FELLOWSHIP-PROJECT-BRIEF.md
├── DEMO-SCRIPT.md
├── TEST-CHECKLIST.md
└── PRIVACY-AND-SAFETY.md
```

## Run locally

Requirements: Node.js 20+ and an OpenAI API key managed by an adult/authorised project owner or mentor where required.

1. Extract this folder.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Add the key to `.env` as `OPENAI_API_KEY=...` and keep this file private.
6. Run `npm start`.
7. Open `http://localhost:3000`.
8. Open `http://localhost:3000/api/health` to check whether the server sees the AI configuration.

Without an API key, the website can load but AI generation will return a clear setup message. Do not put an API key in HTML, JavaScript, GitHub, screenshots, or chat messages.

## Deploy

This is a full-stack Node application. GitHub Pages alone cannot run `server.js` or safely hold the API key. Deploy the repository to a Node-compatible host. A Render blueprint is included in `render.yaml`:

1. Push the complete project structure to a GitHub repository.
2. In Render, create a new Blueprint/Web Service from that repository.
3. Add `OPENAI_API_KEY` in the host's private environment settings. Do not commit it.
4. Keep `OPENAI_MODEL` set to a model enabled for the API project; the default in this package is `gpt-6-luna` and can be changed in the host settings.
5. Deploy and test `/api/health`, resource generation and doubt-solving.
6. Submit the public deployed URL only after these tests pass.

API access and model availability depend on the API account and current provider settings. Usage may incur charges. Review current model availability and pricing before enabling public access.

## Important project limitations

- AI output may be inaccurate, incomplete or biased; teacher review is required before classroom use.
- The prototype does not connect to school records, LMS platforms or official curriculum databases.
- Learning Insights shows local activity counts only; it does not measure mastery, intelligence or academic performance.
- No authentication, multi-school administration, persistent student profiles, guardian dashboard or production monitoring is included.
- This package is a working prototype foundation, not a certified or production-hardened school system.

## Fellowship presentation

See `FELLOWSHIP-PROJECT-BRIEF.md` for the problem, solution, intended impact and roadmap; `DEMO-SCRIPT.md` for a short live demonstration; and `TEST-CHECKLIST.md` for pre-submission verification.
