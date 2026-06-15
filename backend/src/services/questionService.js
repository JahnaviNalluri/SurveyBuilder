const Question = require("../models/Question");

const addQuestion = async (data) => {
  return await Question.create(data);
};

const getSurveyQuestions = async (
  surveyId
) => {
  return await Question.find({
    surveyId,
  }).sort("order");
};

module.exports = {
  addQuestion,
  getSurveyQuestions,
};