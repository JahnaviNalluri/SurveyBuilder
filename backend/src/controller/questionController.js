const questionService = require(
  "../services/questionService"
);

const addQuestion = async (
  req,
  res
) => {
  try {
    const question =
      await questionService.addQuestion({
        ...req.body,
        surveyId: req.params.surveyId,
      });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getQuestions = async (
  req,
  res
) => {
  try {
    const questions =
      await questionService.getSurveyQuestions(
        req.params.surveyId
      );

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
};