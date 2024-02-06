const expr = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const ToDo = require('./models/ToDo');


const port = process.env.PORT;
console.log(port);
const myServer = expr();
const connectionToDatabase = process.env.MONGO_URI;
mongoose.connect(connectionToDatabase)
    .then(() => {console.log("We are connected to the database")})
    .catch((err) => {console.log("Sorry , unable to connect " + err)})
myServer.use(expr.json());
myServer.use(cors());

myServer.listen(3000 , () => console.log("We are listening to port 3000"));

//Routes
myServer.get('/todo' , async (req,res) =>
{
    const task = await ToDo.find();
    console.log(task);
    const obj = res.json(task);
    console.log("I am in my get call");
    if(obj !== undefined && obj !== null && obj.constructor == Object)
    {
        res.statusCode(201);
    }
    else
    {
        res.statusCode(400);
    }

    
});

myServer.post('/todo/new' , async function(req,res)
{
    const task = await ToDo.create(req.body);
    res.status(201).json({task});
});

myServer.delete('/todo/delete/:id' , async function(req,res)
{
    const result = await ToDo.findByIdAndDelete(req.params.id);
    res.json(result);
})

myServer.get('*', function(req, res){
    res.send('what???', 404);
  });

