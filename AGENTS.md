# AGENTS.md

Guidance for Codex agents working in this repo.

## What this is

Agentic Flashcards is a public app/template repo. It contains the reusable flashcard interface, analytics page, Codex-backed chat bridge, and safe demo content.

## Directory layout

- `app/` - public app code.
- `examples/` - safe demo study data.
- `classes/` - local-only private class folders, ignored by Git except `classes/README.md`.

## Private class data

Never commit real class material to this public repo. That includes:

- study guides
- lecture slides
- lecture transcripts
- quizzes
- lab handouts
- screenshots containing class content or personal information
- credentials, auth files, tokens, `.env` files, or private notes

If a user wants the simplest setup, they can keep real course files in `classes/<course-name>/`. That folder is gitignored. Each class folder should contain:

- `study-guide.md`
- `flashcards.json`

It may also contain private course context used to create flashcards and quizzes:

- `lecture_slides/`
- `lecture_transcripts/`
- `labs/`
- `notes/`
- `quizzes/`

Users can also keep class files outside the repo and start the app with `npm start -- --data "/path/to/private/class"`.

## Data format

`flashcards.json` is an array of cards:

```json
[
  {
    "topic": "Topic name",
    "front": "Question",
    "back": "Answer"
  }
]
```

`study-guide.md` is normal Markdown. Use headings or short section-title lines followed by study-guide items.

`quizzes/` is for generated local self-quizzes. Keep quiz files inside the selected class folder so they stay private.

## Agent behavior

- Keep the app usable without private data by preserving demo mode.
- Treat selected class data as read-only context.
- When creating flashcards, use the selected class folder as context and write/update `flashcards.json` only when the user asks.
- When creating quizzes, write them into `classes/<course-name>/quizzes/` unless the user gives a different local private path.
- Treat `study-guide.md` as the source of truth for testable material when it exists. Use slides, transcripts, notes, labs, and prior quizzes as supporting context.
- Do not edit, copy, summarize, or publish private class files unless the user explicitly asks for local-only study work.
- Before committing or pushing, scan for accidental class content and private paths.
