dataSet = []  // Containng all Data of calender
url = 'https://api.airtable.com/v0/applvIErrK8lnXyJK/Table%201?view=Grid%20view&api_key=keydF5mdPvdf8vCa4';

document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        calendar = new FullCalendar.Calendar(calendarEl, {
            
            plugins: [ 'dayGrid', 'interaction' ],
            
            // Fetch Price and put in DataSet arr.            
            events: function(info, successCallback, failureCallback) {
                fetch(url).then(res => res.json())
                .then((out) => {
                    dataSet = Array.prototype.slice.call(out.records);
                    addRemoveBtn(dataSet)
                    changeReport()
                    successCallback(
                    dataSet.map(function(eventEl) {
                      return {
                        id: eventEl.id,
                        title: eventEl.fields.price,
                        start: eventEl.fields.date
                      }
                    })
                  )                    
                })                
            },
            
            //Handler for Remove Btn
            eventClick: function(info){
                console.log('Event '+ info.event.id)
                temp = info.event.id.substring(1)
                del = "https://api.airtable.com/v0/applvIErrK8lnXyJK/Table%201/"+temp
                console.log(del)
                fetch(del,{
                    method: "DELETE",
                    mode: "cors", 
                    headers: {
                        "Authorization": "Bearer keydF5mdPvdf8vCa4"
                    }
                }).then(function(res){
                   if (res.ok) {
                        console.log("Removed Price");
                        calendar.refetchEvents()
                    } else {
                        console.log("Could not reach the API: " + response.statusText);
                    }
                })
            }
            
        });          
        calendar.render();    
      });


function addRemoveBtn(arr){
    let len = Object.keys(arr).length
    for(i=0; i<len; i++){
        temp = {
            id: 'R'+arr[i].id,
            fields: {
                price: "Remove",
                date: arr[i].fields.date
            }
        }
        dataSet.push(temp)  // Update DataSet with Remove B
    }   
}

function addPrice(){
    let date = document.getElementById('date').value;
    let price = document.getElementById('price').value;
    
            
    let newE = "https://api.airtable.com/v0/applvIErrK8lnXyJK/Table%201"
    fetch(newE,{
        method: "POST",
        headers: {
            "Authorization": "Bearer keydF5mdPvdf8vCa4",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                "fields": {
                    "date": date,
                    "price": price
                }
        })
        
    }).then(function(res){
        if (res.ok) {
            document.getElementById('date').value = null;
            document.getElementById('price').value = null;
            console.log("New Price added");
            calendar.refetchEvents()
        } else {
            alert(res.statusText);
            document.getElementById('date').value = null;
            document.getElementById('price').value = null;
            console.log("Could not reach the API: " + res.statusText);
        }
    })
}
