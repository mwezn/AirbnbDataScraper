const fs=require('fs')

function extract(i){
    let r={"date":i.calendarDate, "available":i.available, "price": i.price}
    return r;
}


fs.readFile('Availability2.json',(err,d)=>{
    let f=new Date();
    let Total=0;
    let res=[];
    if(err) console.log(err)
    let data=JSON.parse(d)
    let req=data.data.merlin.pdpAvailabilityCalendar.calendarMonths;
    for (let i=0;i<req.length;i++){
        
        let month=req[i].days.map(d=>extract(d))
        res.push(month)
    }
    let time=f.toISOString()
    res2=[]
    
    for(let i=0;i<res.length;i++){
        let f=res[i].filter(d=>d.date>=`${time.slice(0,10)}`)
        res2.push(f)
        
    }

    console.log(res2)
  

    


})