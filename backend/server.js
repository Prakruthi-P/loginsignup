const express=require("express");
const mysql=require('mysql2')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Admin@123",
    database:"user_account"
})
app.post('/signup',(req,res)=>{
    const sql="INSERT INTO users (USERNAME,EMAIL,PASS) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    const {name,email,password}=req.body
    console.log("request");
    console.log(req.body);
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/login',(req,res)=>{
    const sql="SELECT * FROM users WHERE Email =? AND PASS =?";  
    console.log("request");
    console.log(req.body);
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("success");
        }else{
        return res.json("Fail");
        }
    })
})
app.listen(8081,()=>{
    console.log("listening")
});