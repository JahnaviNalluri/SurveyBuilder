import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Responses.css";

function Responses() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [responses,
    setResponses] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses =
    async () => {

      try {

        const response =
          await api.get(
            `/responses/${id}`
          );

        setResponses(
          response.data
        );

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="loading">
        Loading responses...
      </div>
    );
  }

  return (
    <div className="responses-page">

      <div className="responses-header">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Dashboard
        </button>

        <h1>
          Survey Responses
        </h1>

      </div>

      <div className="response-summary">

        Total Responses:
        {" "}
        {responses.length}

      </div>

      {responses.length === 0 && (
        <div className="empty-state">
          No responses submitted yet.
        </div>
      )}

     <div className="responses-grid">

{responses.map(

(
response,
index

)=>(

<div

key={index}

className="response-card"

>

<div className="response-top">

<h2>

Response #

{response.responseNumber || index+1}

</h2>

<span>

{new Date(

response.createdAt ||

response.submittedAt

).toLocaleString()}

</span>

</div>

<div className="answers-list">

{response.answers.map(

(
answer,
answerIndex

)=>(

<div

key={answerIndex}

className="answer-item"

>

<div className="question">

{answer.questionText}

</div>

<div className="answer">

{answer.answer}

</div>

</div>

)

)}

</div>

</div>

)

)}

</div>

    </div>
  );
}

export default Responses;