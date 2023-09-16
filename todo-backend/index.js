//Imports
//3rd party module (npm i express cors mongodb)

const express = require("express");
const {MongoClient, ObjectId} = require("mongodb");
// MongoClient is use for connectiong node js to mongodb

const cors = require('cors');
const bodyParser = require('body-parser');


//Constand and variable

const app = express();
const connectionString = 'mongodb://0.0.0.0:27017/';
const PORT = 8083;
let dbClient; //db connection save


// middle ware express

app.use(cors()); // Cros origin resource sharing
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true})); //request body
// params (encode it and read in form of body)

app.use(bodyParser.json());

//test api
app.get('/testHello', function(req,res){
    res.send('hello world');
});

// create api

app.post('/addTodo', function(req, res){
    console.log(req.body);
    // validate if you know js
    // object.keys // kaeys are validate or not
    // for every api u have to do


    dbClient.collection("todos").insertOne(req.body,
        function (err, data){
            if(err){
                res.status(400).send(err);
            }
            res.json(data);
        }
        );
})

// read all todos
app.get("/",function(req ,res ){
    dbClient.collection("todos")
    .find()
    .toArray(function(err, items){
        if(err){
            res.status(400).send(err);
        }
        res.send(items);
    });
});

// find by Id
app.get("/:id" ,function(req ,res ) {
    let id = req.params.id;
    dbClient.collection("todos")
    .find({_id: ObjectId(id)})
    .toArray(function (err, items){
        if(err){
            res.status(400).send(err);
        }
        res.send(items);
    });
})

//update
app.put('/update/:id', function(req, res){
    dbClient.collection("todos").findOneAndUpdate(
        {_id: new ObjectId(req.params.id)},
        {
            $set: {
                todo_description: req.body.todo_description,
                todo_responsible: req.body.todo_responsible,
                todo_priority: req.body.todo_priority,
                todo_complete: req.body.todo_complete,
            },

        },
        function (){
            res.send("Success updated!");
        }
    )
})
//delete
app.delete('/deleteTodo/:id', function (req, res) {
    dbClient.collection("todos").deleteOne(
        { _id: new ObjectId(req.params.id) },
        function () {
            res.send("Successfully deleted!");
        },
    );
})


 

// connection to mongo db
//params
// 1 url or connection string mongodb://localhost:27017
// 2 { useNewUrlParser: true }, allow users to fall back to the old parser if they find a bug in the new parser.
// 3  callback  (err, client)
// err if some issue with connection (mongodb not installed or start)
// console.log("Connection established - All well");
// save connection in the variable dbClient
// start the server in callback

MongoClient.connect(
    connectionString,
    { useNewUrlParser: true},
    (error, client)=>{
        if(error){
            return console.log("Connection failed for some reason");
        }
        console.log("Connection established - All well");
        dbClient= client.db("crud"); // Creating or using old db

        app.listen(PORT, function(){
            console.log(`Server started on port ${PORT}`);
        })
    }
)