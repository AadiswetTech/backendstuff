
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

//database connection
mongoose.connect("mongodb://127.0.0.1:27017",
{
         dbName:"backend",
}).then(()=>console.log("DATABASE connected"))
.catch((e)=> console.log(e));


//defining message schema
const messageSchema=new mongoose.Schema({
         name:String,
         email:String,
         password:String
});
const Message=mongoose.model("Message",messageSchema)
//implementing express js
const app=express();


//express miiddleware
// app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}))
//to use cookie parser
//setting up view engine
app.set("view engine","ejs")

app.get("/",(req,res,next)=>
{
       res.render("index")

})

app.post("/login",(req,res)=>
{
     
         res.redirect("/");
}
);


app.get("/success",(req,res)=>
{
         res.render("success")
})
app.post("/contact",async(req,res)=>
{
         const {name,email,password}=req.body;
  await Message.create({name:name,email:email,password:password});
  res.redirect("/success");
})

app.listen(5000,()=>
{
         console.log("express server is working")

})