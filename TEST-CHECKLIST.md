# Pre-submission test checklist

## Local/server checks
- [ ] `npm install` completes successfully.
- [ ] `npm start` starts without an error.
- [ ] `/api/health` returns JSON and reports whether the AI key is configured.
- [ ] With no key configured, the UI loads and AI actions show a clear configuration message.
- [ ] With a valid private key configured, a teacher resource request returns generated text.
- [ ] With a valid private key configured, a doubt-solving request returns an age-appropriate explanation.
- [ ] Empty topic/question fields are rejected with a helpful message.
- [ ] Mobile layout works on a phone-sized screen.
- [ ] Download, copy and print controls work.
- [ ] No API key or `.env` file appears in the Git repository.

## Fellowship submission checks
- [ ] Repository is public or otherwise accessible to reviewers.
- [ ] README explains setup, features, architecture and limitations.
- [ ] A deployed public URL is provided only after end-to-end testing.
- [ ] Demo prompts and a short walkthrough are ready.
- [ ] All impact statements are presented as goals until supported by pilot evidence.
