import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import db from "./db.js";

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

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
   TEST
========================= */

app.get("/", (req, res) => {

    res.send("Server Running");

});

/* =========================
   SERVER
========================= */

app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});