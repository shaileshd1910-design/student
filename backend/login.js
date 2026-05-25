import express from "express";
import db from "./db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        console.log("LOGIN API HIT");
        console.log(req.body);

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password required"
            });
        }

        const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        const [result] = await db.query(sql, [username, password]);

        if (result.length > 0) {
            const user = result[0];

            return res.json({
                success: true,
                role: user.role
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid Username or Password"
            });
        }

    } catch (err) {
        console.log("LOGIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
});

export default router;