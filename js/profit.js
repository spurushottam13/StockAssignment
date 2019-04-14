priceArray = []
dateArray = []

function changeReport(){
    console.log("Report Changing....",Object.keys(dataSet).length)
    
    let startPrice =  parseInt(dataSet[0].fields.price)
    let startDate = dataSet[0].fields.date    
    var low = [startPrice, startDate ] // Price and ID
    var high = [startPrice, startDate ]    
    var len =  Object.keys(dataSet).length /2
    
    for(i=0; i<len; i++){  // two fn 1:) Chart 2:) Max & Min value 
        
        // Populating price and date array for chart
        priceArray.push(parseInt(dataSet[i].fields.price))
        dateArray.push(dataSet[i].fields.date.slice(5))
        
        // Finding Max and Min value        
        
        temp = parseInt(dataSet[i].fields.price)
        if(temp <= low[0]){
            low[0] = temp
            low[1] = dataSet[i].fields.date
        }
        if (temp>= high[0]){
            high[0] = temp
            high[1] = dataSet[i].fields.date
        }
    }
    
    console.log(low,high)
    document.getElementById('maxProfit').innerHTML = (high[0] - low[0]) * 10 // 10 unit of share
    document.getElementById('bestSell').innerHTML = high[1]
    document.getElementById('bestBuy').innerHTML = low[1];  
    
    chartGen()
    
}
