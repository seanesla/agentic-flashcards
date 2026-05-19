# Agentic Flashcards

This is a public demo repo for a flashcard app with a Codex-backed study helper.

What is in here:

- `app/flashcards.html` - the main flashcard study UI
- `app/analytics.html` - progress charts and mastery views
- `app/server.mjs` - a small local server that talks to Codex through your ChatGPT login
- `examples/demo-study-guide.md` - sample public study content

What is not in here:

- private class notes
- lecture slides or transcripts
- quizzes
- lab handouts
- credentials or auth tokens

How to run it:

```bash
npm start
```

Then open the local URL the server prints.

Notes:

- This repo is meant to show the app shell and the agentic chat features.
- If you want to study a real class, keep that material in a private repo or private folder.
