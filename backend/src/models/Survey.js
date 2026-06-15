const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: {
      type: String,
      required: true
    },

    description: String,

    themeColor: {
      type: String,
      default: "#4F46E5"
    },

    logoUrl: String,

    published: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Survey", surveySchema);