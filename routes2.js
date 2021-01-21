require('dotenv').config();
const express = require('express')
const router = express.Router()
const fetch= require('node-fetch')


async function get(URL){
    const requestOptions={
        method: 'GET',
        headers: {
          'x-airbnb-api-key':process.env.AIRBNBKEY,
          "Content-Type": "application/json"
        }
      }
    const res= await fetch(URL, requestOptions);
    const data=await res.json();
    console.log(data)
    return data
      
      
}




router.get('/', (req, res) => {
      res.sendFile(__dirname+'/Airdata.html');

    
})


//NOTE!! This URL will give the availability!
//https://www.airbnb.co.uk/api/v3/PdpAvailabilityCalendar?operationName=PdpAvailabilityCalendar&locale=en-GB&currency=GBP&variables={"request":{"count":12,"listingId":"42605331","month":1,"year":2021}}&extensions={"persistedQuery":{"version":1,"sha256Hash":"b94ab2c7e743e30b3d0bc92981a55fff22a05b20bcc9bcc25ca075cc95b42aac"}}&_cb=1q3m3ho167j41c"
router.post('/city', async (req, res) => {
        if(req.body.city){
           const  city = req.body.city
           //this URL fetches 5 items per grid!
           let URL=`https://www.airbnb.co.uk/api/v3/ExploreSearch?operationName=ExploreSearch&locale=en-GB&currency=GBP&variables=%7B%22request%22%3A%7B%22metadataOnly%22%3Afalse%2C%22version%22%3A%221.7.9%22%2C%22itemsPerGrid%22%3A5%2C%22tabId%22%3A%22home_tab%22%2C%22refinementPaths%22%3A%5B%22%2Fhomes%22%5D%2C%22source%22%3A%22structured_search_input_header%22%2C%22searchType%22%3A%22unknown%22%2C%22neLat%22%3A%2252.47651556795731%22%2C%22neLng%22%3A%22-0.9749232128906158%22%2C%22swLat%22%3A%2252.36931927108658%22%2C%22swLng%22%3A%22-2.103768427734366%22%2C%22searchByMap%22%3Atrue%2C%22query%22%3A%22${city}%22%2C%22cdnCacheSafe%22%3Afalse%2C%22simpleSearchTreatment%22%3A%22simple_search_only%22%2C%22treatmentFlags%22%3A%5B%22simple_search_1_1%22%2C%22simple_search_desktop_v3_full_bleed%22%2C%22flexible_dates_options_extend_one_three_seven_days%22%5D%2C%22screenSize%22%3A%22large%22%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2213aa9971e70fbf5ab888f2a851c765ea098d8ae68c81e1f4ce06e2046d91b6ea%22%7D%7D&_cb=1sqx4jw1qjh92a`
           let data=await get(URL);
           let availability=[];
           availability.push(data)
           let nested=data.data.dora.exploreV3['sections'][2].items;
           for(let i=0;i<nested.length;i++){
               let id=nested[i].listing.id
               let URL2=`https://www.airbnb.co.uk/api/v3/PdpAvailabilityCalendar?operationName=PdpAvailabilityCalendar&locale=en-GB&currency=GBP&variables={"request":{"count":12,"listingId":"${id}","month":1,"year":2021}}&extensions={"persistedQuery":{"version":1,"sha256Hash":"b94ab2c7e743e30b3d0bc92981a55fff22a05b20bcc9bcc25ca075cc95b42aac"}}&_cb=1q3m3ho167j41c`
               let data2= await get(URL2);
               availability.push(data2)
               
           }
    
           console.log(req.body);
           
           return res.status(201).json(availability)
        }
        
    else {
        return res.status(500).json({"error":error});
    }

    
})

module.exports=router;