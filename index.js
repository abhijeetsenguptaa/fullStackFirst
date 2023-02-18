const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./connection/connection');
const {usersRouter} = require('./routes/users.route');
const {notesRouter} = require('./routes/notes.route');
const {authentication} = require('./middlewares/authentication.middleware');


const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to the Homepage....")
})


app.use('/users',usersRouter)

app.use(authentication);
app.use('/notes',notesRouter)



app.listen(process.env.port, async(req,res)=>{
    try{
        await connection;
        console.log("Connected to the Database");
    }catch{
        console.log("Error while connecting to the Database");
    }
    console.log(`Server is connected to port : ${process.env.port}`);
})