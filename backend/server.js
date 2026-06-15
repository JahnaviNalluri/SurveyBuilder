const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");

// Routes
const surveyRoutes = require("./src/routes/surveyRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const responseRoutes = require("./src/routes/responseRoutes");
const authRoutes = require(
  "./src/routes/authRoutes"
);
dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://survey-builder-one.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
// Home Route
app.get("/", (req, res) => {
  res.send("Survey Builder API");
});

// Routes
app.use("/api/surveys", surveyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});