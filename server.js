const express =require("express");
const mongoose =require("mongoose");
require("dotenv").config();
const app=express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
   .then(() =>console.log("MongoDB Connected"))
   .catch(err =>console.log("DBerr:",err));

const todoSchema = new mongoose.Schema({
    	title:String,
        description:String
},{timestamps: true});
const Todo = mongoose.model("Todo",todoSchema)


app.get("/",(req,res)=>
{
    res.send("Server Runing");
});


app.post("/todos", async(req,res)=>{
    try{
    
const todo = new Todo(req.body);
const savedTodo = await todo.save();
res.json(savedTodo);
}catch(err){
res.status(500).json({error:err.message});
}
});

app.get("/todos", async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
});

app.get("/todos/:id", async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
});

app.put("/todos/:id", async(req,res)=>{
const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,	req.body,	{new:true});
res.json(updatedTodo);
});

app.delete("/todos/:id", async(req,res)=>{await Todo.findByIdAndDelete(req.params.id);
    res.json({message:"Todo Deleted"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT || 3000,()=>{
    console.log(`Server Running on port {$ PORT}`);
});