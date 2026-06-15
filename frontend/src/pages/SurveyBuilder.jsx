import { useState } from "react";
import api from "../api/axios";
import "../styles/SurveyBuilder.css";
import { useNavigate } from "react-router-dom";
function SurveyBuilder() {
    const navigate=useNavigate();
  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [themeColor,
    setThemeColor] =
    useState("#4F46E5");
    const [surveyId, setSurveyId] =
  useState(null);

const [saved, setSaved] =
  useState(false);

const [published, setPublished] =
  useState(false);

const [publicUrl, setPublicUrl] =
  useState("");
  const [logoUrl,
    setLogoUrl] =
    useState("");

  const [questions,
    setQuestions] =
    useState([]);

  const token =
    localStorage.getItem(
      "token"
    );

  const addQuestion = (
    type
  ) => {

    const newQuestion = {
      id: Date.now(),
      questionText: "",
      type,
      required: false,
      options:
        type ===
        "multipleChoice"
          ? ["Option 1"]
          : []
    };

    setQuestions([
      ...questions,
      newQuestion
    ]);
  };
  const addOption = (questionIndex) => {

  const updated = [...questions];

  updated[questionIndex].options.push("");

  setQuestions(updated);
};

const updateOption = (
  questionIndex,
  optionIndex,
  value
) => {

  const updated = [...questions];

  updated[questionIndex].options[
    optionIndex
  ] = value;

  setQuestions(updated);
};

const removeOption = (
  questionIndex,
  optionIndex
) => {

  const updated = [...questions];

  updated[questionIndex].options.splice(
    optionIndex,
    1
  );

  setQuestions(updated);
};
  const updateQuestion =
    (
      index,
      field,
      value
    ) => {

      const updated =
        [...questions];

      updated[index][field] =
        value;

      setQuestions(updated);
    };

  const removeQuestion =
    (index) => {

      const updated =
        [...questions];

      updated.splice(index, 1);

      setQuestions(updated);
    };

  const moveUp = (index) => {

    if (index === 0)
      return;

    const updated =
      [...questions];

    [
      updated[index - 1],
      updated[index]
    ] = [
      updated[index],
      updated[index - 1]
    ];

    setQuestions(updated);
  };

  const moveDown =
    (index) => {

      if (
        index ===
        questions.length - 1
      )
        return;

      const updated =
        [...questions];

      [
        updated[index + 1],
        updated[index]
      ] = [
        updated[index],
        updated[index + 1]
      ];

      setQuestions(updated);
    };

  const saveSurvey =
    async () => {

      try {

        const surveyResponse =
          await api.post(
            "/surveys",
            {
              title,
              description,
              themeColor,
              logoUrl
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const surveyId =
          surveyResponse.data._id;

        for (
          let i = 0;
          i <
          questions.length;
          i++
        ) {

          await api.post(
            `/questions/${surveyId}`,
            {
              questionText:
                questions[i]
                  .questionText,

              type:
                questions[i]
                  .type,

              required:
                questions[i]
                  .required,

              options:
                questions[i]
                  .options,

              order: i + 1
            }
          );
        }

        setSurveyId(
  surveyResponse.data._id
);

setSaved(true);

      } catch (error) {
        console.log(error);
        alert(
          "Error saving survey"
        );
      }
    };
    const publishSurvey =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.put(
          `/surveys/${surveyId}/publish`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setPublished(true);

      setPublicUrl(
        `${window.location.origin}/public/${surveyId}`
      );

    } catch (error) {
      console.log(error);
    }
  };
  const copyUrl = () => {

  navigator.clipboard.writeText(
    publicUrl
  );

  alert(
    "URL copied successfully"
  );
};

  return (
  <div className="survey-builder">
    <div className="builder-card">

      <h1>
        Survey Builder
      </h1><br></br>
      <button
  className="dashboard-btn"
  onClick={() =>
    navigate("/dashboard")
  }
>
  ← Back to Dashboard
</button>

      {/* Survey Details */}

      <input
        type="text"
        placeholder="Survey Title"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        style={{
          width: "60%",
          marginBottom:
            "10px",
            background:"white",
            color:"black"
        }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        style={{
          width: "60%",
          marginBottom:
            "10px",
            background:"white",
            color:"black"
        }}
      />
      <br></br>

      {/* Branding */}

    

     <p style={{ color:"black",marginLeft:"-45%"}}>Theme Color:</p>
      

      <input
        type="color"
        value={themeColor}
        onChange={(e) =>
          setThemeColor(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Logo URL"
        value={logoUrl}
        style={{background:"white",color:"black",marginLeft:"-13%"}}
        onChange={(e) =>
          setLogoUrl(
            e.target.value
          )
        }
      />

      <hr />

      {/* Question Types */}

      <h3>
        Add Question
      </h3>

      <div className="question-buttons">

  <button
    onClick={() =>
      addQuestion("text")
    }
  >
    Text
  </button>

  <button
    onClick={() =>
      addQuestion(
        "multipleChoice"
      )
    }
  >
    Multiple Choice
  </button>

  <button
    onClick={() =>
      addQuestion("rating")
    }
  >
    Rating
  </button>

</div>

      <hr />

      {/* Questions */}

      {questions.map(
        (
          question,
          index
        ) => (
          <div
            key={
              question.id
            }
            style={{
              border:
                "1px solid #ddd",
              padding:
                "15px",
              marginBottom:
                "10px",
                color:"black"
               
            }}
          >

            <input
              type="text"
              placeholder="Question"
              value={
                question.questionText
              }
              onChange={(
                e
              ) =>
                updateQuestion(
                  index,
                  "questionText",
                  e.target
                    .value
                )
              }
              style={{
                width:
                  "100%", background:"white",color:"black"
              }}
            />

            <p>
              Type:
              {" "}
              {
                question.type
              }
            </p>{question.type ===
  "multipleChoice" && (

  <div className="options-section">

    <h4>
      Options
    </h4>

    {question.options.map(
      (
        option,
        optionIndex
      ) => (

        <div
          key={optionIndex}
          className="option-row"
        >

          <input
            type="text"
            style={{background:"white",color:"black"}}
            placeholder={`Option ${
              optionIndex + 1
            }`}
            value={option}
            onChange={(e) =>
              updateOption(
                index,
                optionIndex,
                e.target.value
              )
            }
          />

          <button
            type="button"
            onClick={() =>
              removeOption(
                index,
                optionIndex
              )
            }
          >
            X
          </button>

        </div>
      )
    )}

    <button
      type="button"
      onClick={() =>
        addOption(index)
      }
    >
      + Add Option
    </button>

  </div>

)}

           <div className="required-section">

  <input
    className="required-checkbox"
    type="checkbox"
    checked={
      question.required
    }
    onChange={(e) =>
      updateQuestion(
        index,
        "required",
        e.target.checked
      )
    }
  />

  <label>
    Required Question
  </label>

</div>

           

            <div className="question-actions">

  <button
    className="move-btn"
    onClick={() =>
      moveUp(index)
    }
  >
    ↑ 
  </button>

  <button
    className="move-btn"
    onClick={() =>
      moveDown(index)
    }
  >
    ↓ 
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      removeQuestion(index)
    }
  >
    Delete
  </button>

</div>

          </div>
        )
      )}

      <hr />

      <button
        onClick={
          saveSurvey
        }
        style={{
          background:
            themeColor,
          color: "white",
          padding:
            "10px 20px",cursor:"pointer"
        }}
      >
        Save Survey
      </button>
      
<div className="action-section">
{saved && !published && (

  <div
    style={{
      marginTop: "20px",
      
    }}
  >
    <h3>
      Survey Saved
    </h3>

    <button
      onClick={
        publishSurvey
      }
      style={{
  width: "150px",

  height: "35px",background:"green",cursor:"pointer"}}
    >
      Publish Survey
    </button>
  </div>

)}

{published && (

  <div
    style={{
      marginTop: "20px"
    }}
  >
    <h3>
      Survey Published
    </h3>

    <p>
      {publicUrl}
    </p>

    <button
      onClick={
        copyUrl
      }
    >
      Copy URL
    </button>
  </div>

)}

    </div>
    </div>
        </div>

);
 
}

export default SurveyBuilder;