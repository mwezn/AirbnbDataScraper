require('dotenv').config()
const fs= require('fs')
const fetch =require('node-fetch')
const express= require('express')
const app =express();
const routes = require('./routes') // includes the routes.js file
var path =require('path');
app.use(express.json()) 
app.use(routes) 
app.use(express.static(path.join(__dirname, '')))
app.use(express.static(path.join(__dirname, 'Client')))

//THE ABOVE LINE IS NEEDED TO CORRECTLY SERVE JS SCRIPT ASWELL AS
// HTML STATIC FILES FROM CLIENT FOLDER!!
app.listen(process.env.PORT,()=>{
  console.log("The Server is running on port:"+process.env.PORT)

})





