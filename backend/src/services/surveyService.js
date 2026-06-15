const Survey = require("../models/Survey");
const Response =
  require("../models/Response");
const createSurvey = async (surveyData) => {
  return await Survey.create(surveyData);
};
const getUserSurveys =
  async (userId) => {

    const surveys =
      await Survey.find({
        userId
      });

    const surveyData =
      await Promise.all(

        surveys.map(
          async (
            survey
          ) => {

            const responseCount =
              await Response.countDocuments(
                {
                  surveyId:
                    survey._id
                }
              );

            return {
              ...survey.toObject(),

              responseCount
            };
          }
        )
      );

    return surveyData;
};

const getSurveyById = async (surveyId) => {
  return await Survey.findById(surveyId);
};

const updateSurvey = async (surveyId, data) => {
  return await Survey.findByIdAndUpdate(
    surveyId,
    data,
    { new: true }
  );
};

const deleteSurvey = async (surveyId) => {
  return await Survey.findByIdAndDelete(surveyId);
};
const publishSurvey = async (surveyId) => {
  return await Survey.findByIdAndUpdate(
    surveyId,
    {
      published: true
    },
    {
      new: true
    }
  );
};

module.exports = {
  createSurvey,
  getUserSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  publishSurvey,
};