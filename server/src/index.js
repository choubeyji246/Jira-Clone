require('dotenv').config()
const express = require('express')
const app = express()
const cors= require("cors")

const {mongoDbConnection}=require("./utils/db")
const user=require("./auth/route")
const project = require("./project/route")
const task = require("./task/route")
const {errorHandler}=require('./utils/errorHandler')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth',user)
app.use('/project',project)
app.use('/task',task)

app.use(errorHandler)

app.get('/', function (req, res) {
  res.send('Hello world')
})

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})


mongoDbConnection();