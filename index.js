require('dotenv').config()
const fs= require('fs')
const fetch =require('node-fetch')
const express= require('express')
const app =express();
const routes = require('./routes2') // includes the routes.js file


// We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js
let URL= 'https://www.airbnb.co.uk/api/v3/PdpAvailabilityCalendar?operationName=PdpAvailabilityCalendar&locale=en-GB&currency=GBP&variables={"request":{"count":12,"listingId":"46827054","month":1,"year":2021}}&extensions={"persistedQuery":{"version":1,"sha256Hash":"b94ab2c7e743e30b3d0bc92981a55fff22a05b20bcc9bcc25ca075cc95b42aac"}}&_cb=1q3m3ho167j41c'
//The grab() function is just me testing json & practising. You can delete it!!
async function grab(){
  const res = await fetch(URL,{
      method: 'GET',
      headers: {
        'x-airbnb-api-key':'d306zoyjsyarp7ifhu67rjxn52tv0t20',
        "Content-Type": "application/json"
      }
    })
    const data= await res.json();
    fs.writeFile("Availability.json",JSON.stringify(data,null,1),(err)=>{
        if (err) throw err;
        console.log("Data written succesfully")
        
    
    })
}
app.listen(process.env.PORT,()=>{
  console.log("The Server is running on port:"+process.env.PORT)

})





