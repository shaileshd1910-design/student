import express from "express";
import db from "./db.js";

const router = express.Router();

router.post("/login",(req,res)=>{

    const {username,password} = req.body;

    const sql =
    "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql,[username,password],(err,result)=>{

        if(err){
            return res.json({message:"Database Error"});
        }

        if(result.length > 0){

            const user = result[0];

            res.json({

                success:true,
                role:user.role

            });

        }else{

            res.json({

                success:false,
                message:"Invalid Username or Password"

            });

        }

    });

});

export default router;