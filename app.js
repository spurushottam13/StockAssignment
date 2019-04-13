
document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'dayGrid', 'interaction' ],
            events: function(info, successCallback, failureCallback) {
                let url = 'https://api.airtable.com/v0/applvIErrK8lnXyJK/Table%201?api_key=keydF5mdPvdf8vCa4';
                fetch(url).then(res => res.json())
                .then((out) => {
                    console.log(typeof out.records)
                    successCallback(
                    Array.prototype.slice.call(out.records).map(function(eventEl) {
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
        calendar.on('dateClick', function(info) {
        console.log('clicked on ' + info.dateStr);
});
    event
      });