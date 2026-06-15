const responseService = require(
  "../services/responseService"
);

const submitResponse = async (
  req,
  res
) => {
  try {
    const response =
      await responseService.submitResponse({
        surveyId:
          req.params.surveyId,
        answers: req.body.answers,
      });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getResponses = async (
  req,
  res
) => {
  try {
    const responses =
      await responseService.getResponses(
        req.params.surveyId
      );

    res.json(responses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  submitResponse,
  getResponses,
};