# Agentic Flashcards

This is a public demo repo for a flashcard app with a Codex-backed study helper.

What is in here:

- `app/flashcards.html` - the main flashcard study UI
- `app/analytics.html` - progress charts and mastery views
- `app/server.mjs` - a small local server that talks to Codex through your ChatGPT login
- `examples/` - sample public study content
- `classes/README.md` - explains where local-only private class folders can go

What is not in here:

- private class notes
- lecture slides or transcripts
- quizzes
- lab handouts
- credentials or auth tokens

## How to run the demo

```bash
npm start
```

Then open the local URL the server prints.

## How to use it for a real class

Recommended beginner setup:

```text
agentic-flashcards/
  app/
  examples/
  classes/
    biology/
      study-guide.md
      flashcards.json
      lecture_slides/
      lecture_transcripts/
      labs/
      quizzes/
```

Then run:

```bash
npm start -- --class biology
```

`classes/` is ignored by Git, so real class files in that folder do not get committed by accident.

You can also keep class material outside the repo:

```bash
npm start -- --data "/path/to/private/class-folder"
```

Each class folder should have:

- `study-guide.md` - the active study guide
- `flashcards.json` - an array of cards with `topic`, `front`, and `back`

It can also include the private context Codex needs to help you make better cards and quizzes:

- `lecture_slides/`
- `lecture_transcripts/`
- `labs/`
- `notes/`
- `quizzes/`

Example `flashcards.json`:

```json
[
  {
    "topic": "Cell Structure",
    "front": "What does the nucleus do?",
    "back": "It stores DNA and controls many cell activities."
  }
]
```

## Typical workflow

1. Add private class materials to `classes/<course-name>/`.
2. Ask Codex to create or update `flashcards.json` from that private context.
3. Run `npm start -- --class <course-name>`.
4. Study cards in the browser and watch weak areas in analytics.
5. Ask Codex to generate self-quizzes into `classes/<course-name>/quizzes/`.

## Important privacy note

- This repo is meant to show the app shell and the agentic chat features.
- Do not put private class material in `app/` or `examples/`.
- If you keep class material inside this repo, put it under `classes/<course-name>/`.
- Keep generated quizzes and study outputs inside `classes/<course-name>/`, too.
- Before pushing changes, run `git status` and make sure no private course files are staged.
