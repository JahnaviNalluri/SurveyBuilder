const express = require("express");

const router = express.Router();

const {
  createSurvey,
  getMySurveys,
  getSurvey,
  updateSurvey,
  deleteSurvey,
  publishSurvey,
  getPublicSurvey
} = require(
  "../controller/surveyController"
);
const {
  protect,
} = require(
  "../middleware/authMiddleware"
); 
router.get(
  "/public/:id",
  getPublicSurvey
);

router.post(
  "/",
  protect,
  createSurvey
);

router.get(
  "/",
  protect,
  getMySurveys
);

router.get(
  "/:id",
  protect,
  getSurvey
);

router.put(
  "/:id",
  protect,
  updateSurvey
);

router.put(
  "/:id/publish",
  protect,
  publishSurvey
);

router.delete(
  "/:id",
  protect,
  deleteSurvey
);
module.exports = router;