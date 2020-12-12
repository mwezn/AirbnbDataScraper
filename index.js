const fs= require('fs')
const fetch =require('node-fetch')


async function grab(){
  const res = await fetch("https://quizapi.io/api/v1/questions",{
      method: 'GET',
      headers: {
        'X-Api-Key':'Rr8TECTQcOpUk7zRNC9sQYHoTdl5A2p5kJhEt8HJ',
        "Content-Type": "application/json"
      }
    })
    const data= await res.json();
    console.log(data)
}
grab();
