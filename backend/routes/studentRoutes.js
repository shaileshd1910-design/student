import express from "express";
import multer from "multer";
import db from "../db.js";

import {
    addStudent,
    getStudents
} from "../controllers/studentController.js";

const router = express.Router();

/* =========================
   MULTER
========================= */

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

const upload = multer({

    storage: storage

});

/* =========================
   ADD STUDENT
========================= */

router.post(
    "/",
    upload.single("photo"),
    addStudent
);

/* =========================
   GET ALL STUDENTS
========================= */

router.get("/", getStudents);

/* =========================
   GET SINGLE STUDENT
========================= */
/* =========================
   DASHBOARD COUNTS
========================= */

/* =========================
   DASHBOARD COUNTS
========================= */

router.get("/dashboard/counts", async (req,res)=>{

    try{

        const [students] = await db.query(
            "SELECT COUNT(*) AS totalStudents FROM students"
        );

        const [collection] = await db.query(
            "SELECT SUM(paid_amount) AS totalCollection FROM students"
        );

        const [pending] = await db.query(
            "SELECT SUM(pending_amount) AS totalPending FROM students"
        );

        const [departments] = await db.query(
            "SELECT COUNT(DISTINCT course) AS totalDepartments FROM students"
        );

        res.json({

            totalStudents:
            students[0].totalStudents || 0,

            totalCollection:
            collection[0].totalCollection || 0,

            totalPending:
            pending[0].totalPending || 0,

            totalDepartments:
            departments[0].totalDepartments || 0

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});
router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await db.query(

            "SELECT * FROM students WHERE student_id=?",

            [id]

        );

        if (rows.length === 0) {

            return res.status(404).json({

                message: "Student Not Found"

            });

        }

        res.json(rows[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

});

/* =========================
   UPDATE STUDENT
========================= */

router.put("/update-info/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            student_name,
            father_name,
            mobile,
            course,
            year,
            total_fees,
            paid_amount,
            address

        } = req.body;

        const pending_amount =
            Number(total_fees) - Number(paid_amount);

        await db.query(

            `UPDATE students SET

            student_name=?,
            father_name=?,
            mobile=?,
            course=?,
            year=?,
            total_fees=?,
            paid_amount=?,
            pending_amount=?,
            address=?

            WHERE student_id=?`,

            [

                student_name,
                father_name,
                mobile,
                course,
                year,
                total_fees,
                paid_amount,
                pending_amount,
                address,
                id

            ]

        );

        res.json({

            message: "Student Updated Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Update Failed"

        });

    }

});

export default router;