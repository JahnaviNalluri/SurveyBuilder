import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SurveyBuilder from "../pages/SurveyBuilder";
import PublicSurvey from "../pages/PublicSurvey";
import Responses from "../pages/Responses";
import Register from "../pages/Register";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
  path="/register"
  element={<Register />}
/>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/survey/:id"
          element={<SurveyBuilder />}
        />

        <Route
          path="/public/:id"
          element={<PublicSurvey />}
        />

        <Route
          path="/responses/:id"
          element={<Responses />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;