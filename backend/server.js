import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRouter from "./login.js";

dotenv.config();

const app = express();

// ✅ FIX: body parser (THIS WAS YOUR MAIN ERROR)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS FIX for frontend
app.use(cors({
    origin: "*"
}));

// ✅ ROUTES
app.use("/", loginRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});