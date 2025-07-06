import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectdb from "./config/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"


// expose dotenv
dotenv.config({});

// intailize server
const server = express();

// middlware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true, // ✅ CORRECT key name and case
};

server.use(cors(corsOption));

// connect to server
const port = process.env.PORT || 3000;

server.use("/api/v1/user", userRoute);
server.use("/api/v1/company", companyRoute);
server.use("/api/v1/job", jobRoute);
server.use("/api/v1/application", applicationRoute);

server.listen(port, () => {
  // connect database
  connectdb();
  console.log(`the server is running on port ${port}`);
});
