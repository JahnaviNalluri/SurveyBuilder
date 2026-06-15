import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/surveys",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSurveys(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createSurvey = () => {
    navigate("/survey/new");
  };

  const viewResponses = (surveyId) => {
    navigate(`/responses/${surveyId}`);
  };

  const deleteSurvey = async (surveyId) => {
    const confirmDelete = window.confirm(
      "Delete this survey?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem(
        "token"
      );

      await api.delete(
        `/surveys/${surveyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSurveys();
    } catch (error) {
      console.log(error);
    }
  };

  const copyUrl = (surveyId) => {
    const url =
      `${window.location.origin}/public/${surveyId}`;

    navigator.clipboard.writeText(url);

    alert("Public URL copied!");
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>My Surveys</h1>

        <button
          className="create-btn"
          onClick={createSurvey}
        >
          + Create Survey
        </button>
      </div>

      {surveys.length === 0 && (
        <div className="empty">
          No surveys created yet
        </div>
      )}

      <div className="survey-grid">

        {surveys.map((survey) => (

          <div
            className="survey-card"
            key={survey._id}
          >

            <h2>{survey.title}</h2>

            <p>
              {survey.description}
            </p>

            <div className="info">

              <span>
                {survey.published
                  ? "🟢 Published"
                  : "🟠 Draft"}
              </span>

              <span>
                {new Date(
                  survey.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

            <div
              className="response-count"
              onClick={() =>
                viewResponses(
                  survey._id
                )
              }
            >
              📊 Responses:{" "}
              {survey.responseCount || 0}
            </div>

            {survey.published && (

              <div className="url-box">

                <div className="url-header">

                  <strong>
                    🌐 Public URL
                  </strong>

                  <button
                    className="url-copy-btn"
                    onClick={() =>
                      copyUrl(
                        survey._id
                      )
                    }
                  >
                    📋 Copy
                  </button>

                </div>

                <p>
                  {
                    `${window.location.origin}/public/${survey._id}`
                  }
                </p>

              </div>

            )}

            <div className="card-actions">

              <button
                className="response-btn"
                onClick={() =>
                  viewResponses(
                    survey._id
                  )
                }
              >
                Responses
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteSurvey(
                    survey._id
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;