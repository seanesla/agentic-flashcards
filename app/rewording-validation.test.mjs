import assert from "node:assert/strict";
import test from "node:test";

import { parseCandidateRewordFronts, parseJudgedRewordVariants } from "./rewording-validation.mjs";

test("parses candidate fronts from the generator", () => {
  const reply = JSON.stringify({
    variants: [
      "How would you explain natural selection?",
      "What is natural selection?"
    ]
  });

  assert.deepEqual(parseCandidateRewordFronts(reply, "What is natural selection?"), [
    "How would you explain natural selection?"
  ]);
});

test("accepts candidates marked safe by the separate judge", () => {
  const candidates = ["How would you explain natural selection?"];
  const reply = JSON.stringify({
    judgments: [
      {
        front: "How would you explain natural selection?",
        fixedBackStillAnswers: true,
        answerTargetChanged: false,
        fullCreditWithFixedBack: true,
        reason: "The fixed back is an explanation of natural selection."
      }
    ]
  });

  assert.deepEqual(parseJudgedRewordVariants(reply, candidates, "What is natural selection?"), [
    "How would you explain natural selection?"
  ]);
});

test("rejects candidates marked unsafe by the separate judge", () => {
  const candidates = ["What process causes helpful traits to become more common?"];
  const reply = JSON.stringify({
    judgments: [
      {
        front: "What process causes helpful traits to become more common?",
        fixedBackStillAnswers: false,
        answerTargetChanged: true,
        fullCreditWithFixedBack: false,
        reason: "The candidate asks for the process name, not the fixed explanation."
      }
    ]
  });

  assert.deepEqual(parseJudgedRewordVariants(reply, candidates, "What is natural selection?"), []);
});

test("rejects the macroevolution term-for-definition failure case", () => {
  const candidates = [
    "What is the term for evolutionary change on a large scale that builds up from many small changes over time?",
    "How would you define macroevolution?"
  ];
  const reply = JSON.stringify({
    judgments: [
      {
        front: "What is the term for evolutionary change on a large scale that builds up from many small changes over time?",
        fixedBackStillAnswers: false,
        answerTargetChanged: true,
        fullCreditWithFixedBack: false,
        reason: "This asks for the term macroevolution, but the fixed back is the definition."
      },
      {
        front: "How would you define macroevolution?",
        fixedBackStillAnswers: true,
        answerTargetChanged: false,
        fullCreditWithFixedBack: true,
        reason: "The fixed back is a definition of macroevolution."
      }
    ]
  });

  assert.deepEqual(parseJudgedRewordVariants(reply, candidates, "What is macroevolution?"), [
    "How would you define macroevolution?"
  ]);
});

test("rejects related questions that the fixed back would not answer for full credit", () => {
  const candidates = [
    "How does the study of where species live help explain their evolutionary past?",
    "What does biogeography study?"
  ];
  const reply = JSON.stringify({
    judgments: [
      {
        front: "How does the study of where species live help explain their evolutionary past?",
        fixedBackStillAnswers: true,
        answerTargetChanged: true,
        fullCreditWithFixedBack: false,
        reason: "The fixed back is a glossary definition, not a complete answer to a how question."
      },
      {
        front: "What does biogeography study?",
        fixedBackStillAnswers: true,
        answerTargetChanged: false,
        fullCreditWithFixedBack: true,
        reason: "The fixed back directly states what biogeography studies."
      }
    ]
  });

  assert.deepEqual(parseJudgedRewordVariants(reply, candidates, "What is biogeography?"), [
    "What does biogeography study?"
  ]);
});

test("rejects answers that are related but not complete enough for full credit", () => {
  const candidates = ["Why is reproduction important to defining species?"];
  const reply = JSON.stringify({
    judgments: [
      {
        front: "Why is reproduction important to defining species?",
        fixedBackStillAnswers: true,
        answerTargetChanged: true,
        fullCreditWithFixedBack: false,
        reason: "The fixed back names the criterion but does not explain why it matters."
      }
    ]
  });

  assert.deepEqual(parseJudgedRewordVariants(reply, candidates, "What does the biological species concept use to define a species?"), []);
});

test("rejects duplicate, empty, too-long, original-identical, and invented judged fronts", () => {
  const longFront = `${"word ".repeat(53)}?`;
  const candidateReply = JSON.stringify({
    variants: [
      "   ",
      longFront,
      "What is natural selection?",
      "How would you explain natural selection?",
      "how would you explain natural selection"
    ]
  });
  const candidates = parseCandidateRewordFronts(candidateReply, "What is natural selection?");
  const judgeReply = JSON.stringify({
    judgments: [
      {
        front: "How would you explain natural selection?",
        fixedBackStillAnswers: true,
        answerTargetChanged: false,
        fullCreditWithFixedBack: true,
        reason: "safe"
      },
      {
        front: "how would you explain natural selection",
        fixedBackStillAnswers: true,
        answerTargetChanged: false,
        fullCreditWithFixedBack: true,
        reason: "duplicate"
      },
      {
        front: "Invented new candidate",
        fixedBackStillAnswers: true,
        answerTargetChanged: false,
        fullCreditWithFixedBack: true,
        reason: "not in the original candidates"
      }
    ]
  });

  assert.deepEqual(candidates, ["How would you explain natural selection?"]);
  assert.deepEqual(parseJudgedRewordVariants(judgeReply, candidates, "What is natural selection?"), [
    "How would you explain natural selection?"
  ]);
});
