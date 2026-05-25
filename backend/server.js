import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import studentRoutes from "./routes/studentRoutes.js";
import db from "./db.js";

dotenv.config();

const app = express();

/* =========================
   PATH
========================= */

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "frontend")));
app.use("/students", studentRoutes);

/* =========================
   ROUTES
========================= */

app.use("/students", studentRoutes);

/* =========================
   LOGIN
========================= */

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const [result] = await db.query(

            "SELECT * FROM users WHERE username=? AND password=?",

            [username, password]

        );

        if (result.length > 0) {

            res.json({

                success: true,
                role: result[0].role,
                username: result[0].username

            });

        }

        else {

            res.json({

                success: false,
                message: "Invalid Login"

            });

        }

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

});

/* =========================
   HOME PAGE
========================= */

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../frontend/index.html"));

});

app.get("/admin", (req, res) => {

    res.sendFile(path.join(__dirname, "../frontend/admin.html"));

});

/* =========================
   TEST ROUTE
========================= */

app.get("/test", (req, res) => {

    res.send("Server Running Successfully");

});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});