require('dotenv').config()
const fs= require('fs')
const express= require('express')
const app =express();
const routes = require('./routes') // includes the routes.js file
var path =require('path');


function myMiddleWare(req,res,next){
  //req.ip can be used to count unique website visitors
  console.log(req.method+" "+req.path+" "+req.ip) 
  next();
}

app.use(express.json()) 
app.use(routes) 
app.use(express.static(path.join(__dirname, '')))
app.use(express.static(path.join(__dirname, 'Client')))
app.use(myMiddleWare)
//THE ABOVE LINE IS NEEDED TO CORRECTLY SERVE JS SCRIPT ASWELL AS
// HTML STATIC FILES FROM CLIENT FOLDER!!
console.log(__dirname)

app.listen(process.env.PORT,()=>{
  console.log("The Server is running on port:"+process.env.PORT)
})





