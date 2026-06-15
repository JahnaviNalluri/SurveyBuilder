import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/PublicServey.css";

function PublicSurvey() {
  const { id } = useParams();

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const response =
        await api.get(
          `/surveys/public/${id}`
        );

      setSurvey(
        response.data.survey
      );

      setQuestions(
        response.data.questions
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    questionId,
    value
  ) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };
const handleCheckboxChange = (

  questionId,

  option,

  checked

) => {

  setAnswers(

    (prev) => {

      const existing =

        prev[questionId] || [];

      let updated;

      if (checked) {

        updated = [

          ...existing,

          option

        ];

      }

      else {

        updated = existing.filter(

          (item) =>

            item !== option

        );

      }

      return {

        ...prev,

        [questionId]:

          updated

      };

    }

  );

};
  const submitSurvey =
    async () => {
      try {

       const payload = {

  answers:

  Object.keys(
    answers
  ).map((key) => ({

    questionId: key,

    answer:

    Array.isArray(
      answers[key]
    )

    ? answers[key].join(
        ", "
      )

    : answers[key]

  }))

};
        

        await api.post(
          `/responses/${id}`,
          payload
        );

        setSubmitted(true);

      } catch (error) {
        console.log(error);
      }
    };

  if (loading)
    return <h2>Loading...</h2>;

  if (!survey)
    return (
      <h2>
        Survey not found
      </h2>
    );

  if (submitted)
    return (
      <div className="thank-you">
        <h1>
          🎉 Thank You!
        </h1>

        <p>
          Your response has
          been submitted.
        </p>
      </div>
    );

  return (
    <div
      className="public-survey"
      style={{
        borderTop:
          `8px solid ${survey.themeColor}`,
      }}
    >

      {/* Logo */}

      {survey.logoUrl && (
        <img
          src={survey.logoUrl}
          alt="logo"
          className="survey-logo"
        />
      )}

      {/* Survey Details */}

      <h1
        style={{
          color:
            survey.themeColor,
        }}
      >
        {survey.title}
      </h1>

      <p>
        {
          survey.description
        }
      </p>

      {/* Questions */}

      {questions.map(
        (question) => (
          <div
            key={
              question._id
            }
            className="question-card"
          >
            <label>

              {
                question.questionText
              }

              {question.required &&
                " *"}

            </label>

            {/* Text */}

            {question.type ===
              "text" && (
              <input
                type="text"
                onChange={(e) =>
                  handleChange(
                    question._id,
                    e.target.value
                  )
                }
              />
            )}

            {/* Rating */}

            {question.type ===
              "rating" && (
              <select
                onChange={(e) =>
                  handleChange(
                    question._id,
                    e.target.value
                  )
                }
              >
                <option>
                  Select Rating
                </option>

                <option value="1">
                  1
                </option>

                <option value="2">
                  2
                </option>

                <option value="3">
                  3
                </option>

                <option value="4">
                  4
                </option>

                <option value="5">
                  5
                </option>
              </select>
            )}

            {/* Multiple Choice */}

   {question.type ===
  "multipleChoice" && (

  <div>

    {question.options?.map(

      (
        option,
        index

      ) => (

      <div

        key={index}

        className="option-item"

      >

        <input

          type="checkbox"

          checked={

            answers[
              question._id
            ]?.includes(
              option
            ) || false

          }

          onChange={(e)=>

            handleCheckboxChange(

              question._id,

              option,

              e.target.checked

            )

          }

        />

        <label>

          {option}

        </label>

      </div>

    ))}

  </div>

)}
          </div>
        )
      )}

      <button
        className="submit-btn"
        style={{
          background:
            survey.themeColor,
        }}
        onClick={
          submitSurvey
        }
      >
        Submit Response
      </button>

    </div>
  );
}

export default PublicSurvey;