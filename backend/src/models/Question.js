const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey"
    },

    questionText: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: [
        "text",
        "textarea",
        "multipleChoice",
        "rating"
      ]
    },

    options: [String],

    required: {
      type: Boolean,
      default: false
    },

    order: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);