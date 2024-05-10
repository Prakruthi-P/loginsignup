import express from "express";
import {PORT} from "./config.js"
const app=express();
app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome")
});
app.listen(4000,()=>{
console.log("Appliction is running successfuly",PORT);
}
);

