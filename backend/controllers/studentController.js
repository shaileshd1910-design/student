import db from "../db.js";

/* =========================
   ADD STUDENT
========================= */

export const addStudent = async (req, res) => {

    try {

        const {

            student_name,
            father_name,
            mother_name,

            mobile,
            email,

            gender,
            dob,

            caste,
            category,
            aadhaar,

            course,
            year,
            admission_date,

            total_fees,
            paid_amount,
            scholarship,

            address

        } = req.body;

        /* PHOTO */

        const photo =
            req.file ? req.file.filename : "";

        /* =========================
           AUTO STUDENT ID
        ========================= */

        const departmentCode =

            course === "B.Pharmacy"
                ? "BPH"

                : course === "D.Pharmacy"
                    ? "DPH"

                    : course === "M.Pharmacy"
                        ? "MPH"

                        : "GEN";

        const [countRows] = await db.query(

            "SELECT COUNT(*) AS total FROM students WHERE course=?",

            [course]

        );

        const nextNumber =
            countRows[0].total + 1;

        const yearNow =
            new Date().getFullYear();

        const student_id =

            `${departmentCode}-${yearNow}-${String(nextNumber).padStart(3, "0")}`;

        /* =========================
           FEES CALCULATION
        ========================= */

        const pending_amount =

            Number(total_fees || 0)
            -
            Number(paid_amount || 0)
            -
            Number(scholarship || 0);

        /* =========================
           INSERT STUDENT
        ========================= */

        await db.query(

            `INSERT INTO students (

                student_id,
                student_name,
                father_name,
                mother_name,
                mobile,
                email,
                gender,
                dob,
                caste,
                category,
                aadhaar,
                course,
                year,
                admission_date,
                total_fees,
                paid_amount,
                pending_amount,
                scholarship,
                address,
                photo

            ) VALUES (

                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?

            )`,

            [

                student_id,
                student_name,
                father_name,
                mother_name,
                mobile,
                email,
                gender,
                dob,
                caste,
                category,
                aadhaar,
                course,
                year,
                admission_date,
                total_fees,
                paid_amount,
                pending_amount,
                scholarship,
                address,
                photo

            ]

        );

        res.json({

            success: true,
            message: "Student Added Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

/* =========================
   GET ALL STUDENTS
========================= */

export const getStudents = async (req, res) => {

    try {

        const [students] = await db.query(

            "SELECT * FROM students ORDER BY id DESC"

        );

        res.json(students);

    }

    catch (error) {

        console.log(error);

        res.json([]);

    }

};