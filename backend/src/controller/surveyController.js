const surveyService = require("../services/surveyService");
const Question = require("../models/Question");
const createSurvey = async (req, res) => {
     console.log(req.user);
  try {
    const survey =
      await surveyService.createSurvey({
        ...req.body,
        userId: req.user._id,
     
      });

    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMySurveys = async (req, res) => {
  try {
    const surveys =
      await surveyService.getUserSurveys(
        req.user._id
      );

    res.json(surveys);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSurvey = async (req, res) => {
  try {
    const survey =
      await surveyService.getSurveyById(
        req.params.id
      );

    if (!survey) {
      return res
        .status(404)
        .json({ message: "Survey not found" });
    }

    res.json(survey);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateSurvey = async (req, res) => {
  try {
    const survey =
      await surveyService.updateSurvey(
        req.params.id,
        req.body
      );

    res.json(survey);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSurvey = async (req, res) => {
  try {
    await surveyService.deleteSurvey(
      req.params.id
    );

    res.json({
      message: "Survey deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const publishSurvey = async (req, res) => {
  try {
    const survey =
      await surveyService.publishSurvey(
        req.params.id
      );

    if (!survey) {
      return res.status(404).json({
        message: "Survey not found"
      });
    }

    res.json({
      message: "Survey published successfully",
      survey,
      publicUrl: `/survey/${survey._id}`
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getPublicSurvey = async (req, res) => {
  try {

    const survey =
      await surveyService.getSurveyById(
        req.params.id
      );

    if (!survey) {
      return res.status(404).json({
        message: "Survey not found"
      });
    }

    if (!survey.published) {
      return res.status(403).json({
        message: "Survey is not published"
      });
    }

    const questions =
      await Question.find({
        surveyId: survey._id
      }).sort("order");

    res.json({
      survey,
      questions
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  createSurvey,
  getMySurveys,
  getSurvey,
  updateSurvey,
  deleteSurvey,
  publishSurvey,
  getPublicSurvey
};