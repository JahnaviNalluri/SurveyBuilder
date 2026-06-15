const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey"
    },

    answers: [
      {
        questionId: String,
        answer: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Response",
  responseSchema
);