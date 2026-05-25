import db from "../db.js";

export const dashboardData = async(req,res)=>{

    const [students] = await db.query(
        "SELECT COUNT(*) AS total FROM students"
    );

    const [fees] = await db.query(
        "SELECT SUM(paid_amount) AS received FROM students"
    );

    const [pending] = await db.query(
        "SELECT SUM(pending_amount) AS pending FROM students"
    );

    res.json({

        totalStudents:students[0].total,

        totalFees:fees[0].received,

        pendingFees:pending[0].pending

    });

}