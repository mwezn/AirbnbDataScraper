const fs=require('fs')

function extract(i){
    let r={"date":i.calendarDate, "available":i.available}
    return r;
}


fs.readFile('Availability.json',(err,d)=>{
    let f=new Date();
    let Total=0;
    let res=[];
    if(err) console.log(err)
    let data=JSON.parse(d)
    let req=data.data.merlin.pdpAvailabilityCalendar.calendarMonths;
    console.log(req.length)
    
    for (let i=0;i<2;i++){
        
        let month=req[i].days.map(d=>extract(d))
        res.push(month)
    }
    console.log(f,f.toISOString())
    let time=f.toISOString()
    console.log(time.slice(0,10))
    for(let i=0;i<res.length;i++){
        console.log(res[i].filter(d=>d.date>=`${time}`))
        
    }
    


})