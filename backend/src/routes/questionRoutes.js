const express = require("express");

const router = express.Router();

const {
  addQuestion,
  getQuestions,
} = require(
  "../controller/questionController"
);

router.post(
  "/:surveyId",
  addQuestion
);

router.get(
  "/:surveyId",
  getQuestions
);

module.exports = router;