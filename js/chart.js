console.log("ChartJS Loaded")


function chartGen(){
    console.log("chart gen...",priceArray)
    var data = {
  labels: dateArray,
  series: [priceArray]
};

var other = {
    low: 0,
    showArea: true
}

var chart = new Chartist.Line('.ct-chart', data, other);

chart.on('draw', function(data) {
  if(data.type === 'line' || data.type === 'area') {
    data.element.animate({
      d: {
        begin: 2000 * data.index,
        dur: 2000,
        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
        to: data.path.clone().stringify(),
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  }
});
}