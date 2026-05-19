# Private Class Folders

Put real course folders here if you want the simplest setup:

```text
classes/
  biology/
    study-guide.md
    flashcards.json
    lecture_slides/
    lecture_transcripts/
    labs/
    notes/
    quizzes/
```

Everything inside `classes/` is ignored by Git except this README, so your real class files do not get committed by accident.

Use each class folder as the private context folder for that course. Put the study guide, slides, transcripts, notes, lab files, and old quizzes here so Codex has enough context to help create flashcards.

Start a class deck with:

```bash
npm start -- --class biology
```

Typical workflow:

1. Add private class materials to `classes/<course-name>/`.
2. Ask Codex to create or update `flashcards.json`.
3. Study with the browser app.
4. Ask Codex to generate practice quizzes into `classes/<course-name>/quizzes/`.
