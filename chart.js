var dateTimeData;
var otherData;
var type = "line";
var label = "Air Quality Index"

var dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
    dateTimeData = json;
    dateTimeData.shift();
});

var otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Air-Quality.json", function(json){
    otherData = json;
    otherData.shift();
});

var data, options, ctx, myChart;

$.when(dateTimeRequest, otherRequest).then(function(){
    data = {
        labels: dateTimeData,
        datasets: [
            {
                label: label,
                fillColor: "rgba(220,0,0,0.5)",
                strokeColor: "rgba(220,220,0,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: otherData
            }]
    };

    options = {
        scaleShowGridLines : true,
    };

    ctx = document.getElementById("myChart").getContext("2d");

    myChart = new Chart(ctx, {
        type: type,
        data: data,
    });
});



function updateChartType(){

    type = document.getElementById("ChartType").value;

    myChart.destroy();
    myChart = new Chart(ctx, {
        type: type,
        data: data,
    });

}


function updateIndexType(){

    myChart.destroy();

    label = document.getElementById("IndexType").value;

    if(label == "Air Quality"){
        getAirQualityData();
    }
    else if(label == "Soil pH"){
        getSoilPhData();
    }
    else if(label == "Soil Moisture"){
        getSoilMoistureData();
    }
    else if(label == "Temperature"){
        getTemperatureData();
    }
    else if(label == "Humidity"){
        getHumidityData();
    }
    else if(label == "Prediction Models"){
        getPredictionModelsData();
    }

}


function getAirQualityData(){
    dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
        dateTimeData = json;
        dateTimeData.shift();
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Air-Quality.json", function(json){
        otherData = json;
        otherData.shift();
    });    

    $.when(dateTimeRequest, otherRequest).then(function(){
        data = {
            labels: dateTimeData,
            datasets: [
                {
                    label: label,
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: otherData
                }]
        };
    
        options = {
            scaleShowGridLines : true,
        };
    
        ctx = document.getElementById("myChart").getContext("2d");
    
        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
    });
}


function getSoilPhData(){
    dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
        dateTimeData = json;
        dateTimeData.shift();
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Soil-pH.json", function(json){
        otherData = json;
        otherData.shift();
    });

    $.when(dateTimeRequest, otherRequest).then(function(){
        data = {
            labels: dateTimeData,
            datasets: [
                {
                    label: label,
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: otherData
                }]
        };
    
        options = {
            scaleShowGridLines : true,
        };
    
        ctx = document.getElementById("myChart").getContext("2d");
    
        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
    });
}


function getSoilMoistureData(){
    dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
        dateTimeData = json;
        dateTimeData.shift();
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Soil-Moisture.json", function(json){
        otherData = json;
        otherData.shift();
    });

    $.when(dateTimeRequest, otherRequest).then(function(){
        data = {
            labels: dateTimeData,
            datasets: [
                {
                    label: label,
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: otherData
                }]
        };
    
        options = {
            scaleShowGridLines : true,
        };
    
        ctx = document.getElementById("myChart").getContext("2d");
    
        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
    });
}


function getTemperatureData(){
    dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
        dateTimeData = json;
        dateTimeData.shift();
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Temperature.json", function(json){
        otherData = json;
        otherData.shift();
    });

    $.when(dateTimeRequest, otherRequest).then(function(){
        data = {
            labels: dateTimeData,
            datasets: [
                {
                    label: label,
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: otherData
                }]
        };
    
        options = {
            scaleShowGridLines : true,
        };
    
        ctx = document.getElementById("myChart").getContext("2d");
    
        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
    });
}


function getHumidityData(){
    dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
        dateTimeData = json;
        dateTimeData.shift();
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Humidity.json", function(json){
        otherData = json;
        otherData.shift();
    });

    $.when(dateTimeRequest, otherRequest).then(function(){
        data = {
            labels: dateTimeData,
            datasets: [
                {
                    label: label,
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: otherData
                }]
        };
    
        options = {
            scaleShowGridLines : true,
        };
    
        ctx = document.getElementById("myChart").getContext("2d");
    
        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
    });
}


function getPredictionModelsData(){
    dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
        dateTimeData = json;
        dateTimeData.splice(0,1);
    });

    var diseaseDetectionData, soilTextureData, weedPestData, yieldPredictionData;

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Camera-Data-Analysis/Disease-Detection.json", function(json){
        diseaseDetectionData = json;
        diseaseDetectionData.splice(0,1);
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Camera-Data-Analysis/Soil-Texture.json", function(json){
        soilTextureData = json;
        soilTextureData.splice(0,1);
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Camera-Data-Analysis/Weed&PestsDetection.json", function(json){
        weedPestData = json;
        weedPestData.splice(0,1);
    });

    otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Camera-Data-Analysis/Yield-Prediction.json", function(json){
        yieldPredictionData = json;
        yieldPredictionData.splice(0,1);
    });

    $.when(dateTimeRequest, otherRequest).then(function(){
        data = {
            labels: dateTimeData,
            datasets: [
                {
                    label: "Disease Detection Prediction",
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: diseaseDetectionData
                },
                {
                    label: "Soil Texture Prediction",
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: soilTextureData
                },
                {
                    label: "Weed & Pest Detection Prediction",
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: weedPestData
                },
                {
                    label: "Yield Prediction",
                    fillColor: "rgba(220,0,0,0.5)",
                    strokeColor: "rgba(220,220,0,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: yieldPredictionData
                },
            ]
        };
    
        options = {
            scaleShowGridLines : true,
        };
    
        ctx = document.getElementById("myChart").getContext("2d");
    
        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
    });
}