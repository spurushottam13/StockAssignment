console.log("it works")
 document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'dayGrid', 'interaction' ],
        
            events: [
                {
                    title: 'Day1',
                    start: '2019-04-15'
                },
                {
                    title: 'Day2',
                    start: '2019-04-08'
                }
            ]
            
        });

        calendar.render();
        calendar.on('dateClick', function(info) {
        console.log('clicked on ' + info.dateStr);
});
      });