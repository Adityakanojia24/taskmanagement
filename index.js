const express = require("express");
// const databaseconnection = require("./dbconnection");
const mongoose = require("mongoose")
require('dotenv').config()
const app = express();

const USER_MODEL = require("./taskmodel");


const databaseconnection = require("./dbconnection")
app.use(express.json());

app.post("/tasks", async (req, res) => {
  try {
    const comingdata = req.body;
    // console.log(c);
    console.log(comingdata);
    const newData = new USER_MODEL({
      Task: comingdata.text,
      Date: comingdata.day,
    });
    await newData.save();
    res.json({ success: true, message: "New database created",newData });
  } catch (error) {
    res.status(404).json({ success: false ,message:error.message});
  }
});

app.get("/tasks", async(req,res)=>{
    try{
        console.log("fetching users data from database..");
        const data = await USER_MODEL.find().sort({likes:-1});
        res.json({success:true,data});
    }catch(error)
    {
        console.log(error);
        res.status(404).json({success:false});
}

});

app.delete("/tasks/:id",async (req,res)=>{
    try {
        const {id}=req.params;
        const del=await USER_MODEL.findByIdAndDelete(id);
        res.json({success:true,taskDeleted:del})
    } catch (error) {
        console.log(error);
        res.status(404).json({success:false});
    }
})

// if(process.env.NODE_ENV==='production'){
  const path = require('path')

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'client','build')))
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
// }

databaseconnection();


let port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is created with port number ${port}`);
});
