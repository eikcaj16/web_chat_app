import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import model from "./models/index.js";


const app = express();

mongoose.connect('mongodb://localhost:27017/messagingapp');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

routes(app);

export default app;