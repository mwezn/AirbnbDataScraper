var map, marker, infoWin, infoBubble
      var t=new Date();
      console.log(t,t.toISOString())

      async function default_city(){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: 'Coventry'})
      };
        document.getElementById("asyncwait").innerHTML=`Loading data for Coventry...please wait`;
        const res= await fetch(`http://localhost:3050/city`,requestOptions)
        const data=await res.json();
        if(data) document.getElementById("asyncwait").innerHTML="";
        console.log(data)
        let nested=data[0]
        for(let i=0;i<nested.length;i++){
          let result={
              coords: {lat:parseFloat(nested[i].listing.lat),lng:parseFloat(nested[i].listing.lng)},
              name: nested[i].listing.name,
              id:nested[i].listing.id,
              pics: nested[i].listing.contextualPictures.map(i=>i.picture),
              availability: nested[i].listing.Calendar.data.merlin.pdpAvailabilityCalendar.calendarMonths[0].days
            };
            infoMarker(result);

        }
        map.setCenter(loc['Coventry']);
        map.setZoom(11)
        
          
  }
      
      async function choose(props){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: props.id})
      };
        document.getElementById("asyncwait").innerHTML=`Loading data for ${props.id}...please wait`;
        const res= await fetch(`http://localhost:3050/city`,requestOptions)
        const data=await res.json();
        if(data) document.getElementById("asyncwait").innerHTML="";
        console.log(data)
        let nested=data[0]
        for(let i=0;i<nested.length;i++){
          let result={
              coords: {lat:parseFloat(nested[i].listing.lat),lng:parseFloat(nested[i].listing.lng)},
              name: nested[i].listing.name,
              id:nested[i].listing.id,
              pics: nested[i].listing.contextualPictures.map(i=>i.picture),
              availability: nested[i].listing.Calendar.data.merlin.pdpAvailabilityCalendar.calendarMonths[0].days
            };
            infoMarker(result);

        }
        map.setCenter(loc[props.id]);
        map.setZoom(11)
        
          
  }
      var gmarkers = [];
       

       function initMap() {

         infoBubble =new InfoBubble({
            minHeight:500,
            maxWidth: 100,
            minHeight:200,
            borderRadius: 10,
            borderColor: '#aaa',
            backgroundColor:'#cdb',
          //disableAutoPan: true
         })
          infoBubble.addTab("Tab 1",null)
          infoBubble.addTab("Tab 2",null)
          infoBubble.addTab("Tab 3", null)
          
         
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: new google.maps.LatLng(54.4,-1.6),
          mapTypeId: 'terrain'
        });
      }     
  

      function markerp(props){ 
          var marker =new google.maps.Marker({
             position: props.coords,
             map:map,
             title:props.name
          })
          gmarkers.push(marker)
          //map.setCenter(props.coords);
      }   
      function removeMarkers(props){
        for(i=0; i<gmarkers.length; i++){
         gmarkers[i].setMap(null);
       }
      }

       function infoMarker(props){
          var marker =new google.maps.Marker({
              position: props.coords,
              map:map,
              title:props.name
           })
           
           marker.addListener('click',function(){
             console.log('clicked')
             let tab=document.getElementById('infobox')
             tab.classList.toggle('active')
            infoBubble.updateTab(0,"name",`<h2>Id:${props.id}</h2>
             <h2>Name:${props.name}</h2><h2><a target=_blank href=https://www.airbnb.co.uk/rooms/${props.id}>https://www.airbnb.co.uk/rooms/${props.id}</a></h2>`)
            infoBubble.updateTab(1,"pic",`<img src="${props.pics[0]}" width="500" height="600"><img src="${props.pics[1]}" width="500" height="600">`)
            infoBubble.updateTab(2,"availability",`<ul><li>${JSON.stringify(props.availability)}</li></ul>`)
            if(!infoBubble.isOpen()){
              infoBubble.open(map, marker);
            }
            else{
                infoBubble.close()
                
            }
            console.log(infoBubble)
            
          })
       }
       default_city();  
      

      

