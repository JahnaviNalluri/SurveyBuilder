const Response = require("../models/Response");
const Question=require("../models/Question");
const submitResponse = async (
  data
) => {
  return await Response.create(data);
};

const getResponses = async (
  surveyId
) => {

  const responses =
    await Response.find({
      surveyId
    });

  const questions =
    await Question.find({
      surveyId
    });

  const questionMap = {};

  questions.forEach(
    (question) => {

      questionMap[
        question._id.toString()
      ] =
        question.questionText;
    }
  );

  const formattedResponses =
    responses.map(
      (
        response,
        index
      ) => {

        return {

          responseNumber:
            index + 1,

          submittedAt:
            response.createdAt,

          answers:
            response.answers.map(
              (answer) => ({
                questionText:
                  questionMap[
                    answer.questionId
                  ] ||
                  "Unknown Question",

                answer:
                  answer.answer
              })
            )
        };
      }
    );

  return formattedResponses;
};

module.exports = {
  submitResponse,
  getResponses,
};