
dataSet = []  // Containng all Data of calender
newDS = []

document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'dayGrid', 'interaction' ],
            events: function(info, successCallback, failureCallback) {
                let url = 'https://api.airtable.com/v0/applvIErrK8lnXyJK/Table%201?api_key=keydF5mdPvdf8vCa4';
                fetch(url).then(res => res.json())
                .then((out) => {
                    dataSet = Array.prototype.slice.call(out.records);
                    addRemoveBtn(dataSet)
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



