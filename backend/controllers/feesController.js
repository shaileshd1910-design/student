import db from "../db.js";

export const addFees = async(req,res)=>{

    try{

        const {
            student_id,
            received_amount
        } = req.body;

        const [student] = await db.query(
            "SELECT * FROM students WHERE student_id=?",
            [student_id]
        );

        if(student.length === 0){

            return res.json({
                success:false,
                message:"Student Not Found"
            });

        }

        const data = student[0];

        const newPaid =
        Number(data.paid_amount) + Number(received_amount);

        const newPending = Math.max(

    0,

    Number(data.total_fees)
    -
    (
        Number(newPaid)
        +
        Number(data.scholarship || 0)
    )

);

        await db.query(
        `UPDATE students
        SET paid_amount=?, pending_amount=?
        WHERE student_id=?`,
        [newPaid,newPending,student_id]
        );

        await db.query(
        `INSERT INTO fees(
            student_id,
            student_name,
            department,
            total_fees,
            received_amount,
            pending_amount,
            payment_date
        )
        VALUES(?,?,?,?,?,?,CURDATE())`,
        [
            student_id,
            data.student_name,
            data.course,
            data.total_fees,
            received_amount,
            newPending
        ]
        );

        res.json({
            success:true,
            message:"Fees Added"
        });

    }catch(error){

        console.log(error);

        res.json({
            success:false
        });

    }

}