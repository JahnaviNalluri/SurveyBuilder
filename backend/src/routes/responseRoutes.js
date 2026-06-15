const express = require("express");

const router = express.Router();

const {
  submitResponse,
  getResponses,
} = require(
  "../controller/responseController"
);

router.post(
  "/:surveyId",
  submitResponse
);

router.get(
  "/:surveyId",
  getResponses
);

module.exports = router;