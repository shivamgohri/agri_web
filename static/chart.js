var dateTimeData;
var otherData;
var type = "line";
var label = "Air Quality"

var diseaseDetectionData, soilTextureData, weedPestData, yieldPredictionData;

var dateTimeRequest = $.ajax({
    type: 'POST',
    url: '/getdata?data=date',
    data: label,
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (data) {
        // Get and display the result
        var values = Object.keys(data).map(function (key) { return data[key]; });
        dateTimeData = values;

        var len = dateTimeData.length;
        if(len>20){
            var diff = len - 20;
            while(diff--){
                dateTimeData.shift();
            }
        }

    },
});

var otherRequest = $.ajax({
    type: 'POST',
    url: '/getdata?data=air',
    data: label,
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (data) {
        // Get and display the result
        var values = Object.keys(data).map(function (key) { return data[key]; });
        otherData = values;

        var len = otherData.length;
        if(len>20){
            var diff = len - 20;
            while(diff--){
                otherData.shift();
            }
        }

    },
});

// var otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Air-Quality.json", function(json){
//     otherData = json;
//     otherData.shift();
// });

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

    $("#chartSpinner").hide();

    myChart = new Chart(ctx, {
        type: type,
        data: data,
    });
    updateTable();
});



function updateChartType(){

    $("#chartSpinner").show();

    type = document.getElementById("ChartType").value;
    myChart.destroy();

    $("#chartSpinner").hide();
    myChart = new Chart(ctx, {
        type: type,
        data: data,
    });

}


function updateIndexType(){

    $("#chartSpinner").show();
    $("#tableSpinner").show();

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

    otherRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=air',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            otherData = values;

            var len = otherData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    otherData.shift();
                }
            }

        },
    });

    dateTimeRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateTimeData = values;

            var len = dateTimeData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    dateTimeData.shift();
                }
            }

        },
    });

    // otherRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Air-Quality.json", function(json){
    //     otherData = json;
    //     otherData.shift();
    // });

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

        $("#chartSpinner").hide();

        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
        updateTable();
    });
}


function getSoilPhData(){
    dateTimeRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateTimeData = values;

            var len = dateTimeData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    dateTimeData.shift();
                }
            }

        },
    });

    otherRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=ph',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            otherData = values;

            var len = otherData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    otherData.shift();
                }
            }

        },
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

        $("#chartSpinner").hide();

        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
        updateTable();
    });
}


function getSoilMoistureData(){
    dateTimeRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateTimeData = values;

            var len = dateTimeData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    dateTimeData.shift();
                }
            }

        },
    });

    otherRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=moisture',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            otherData = values;

            var len = otherData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    otherData.shift();
                }
            }

        },
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

        $("#chartSpinner").hide();

        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
        updateTable();
    });
}


function getTemperatureData(){
    dateTimeRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateTimeData = values;

            var len = dateTimeData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    dateTimeData.shift();
                }
            }

        },
    });

    otherRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=temperature',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            otherData = values;

            var len = otherData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    otherData.shift();
                }
            }

        },
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

        $("#chartSpinner").hide();

        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
        updateTable();
    });
}


function getHumidityData(){
    dateTimeRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateTimeData = values;

            var len = dateTimeData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    dateTimeData.shift();
                }
            }

        },
    });

    otherRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=humidity',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            otherData = values;

            var len = otherData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    otherData.shift();
                }
            }

        },
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

        $("#chartSpinner").hide();

        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });
        updateTable();
    });
}


function getPredictionModelsData(){
    dateTimeRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateTimeData = values;

            var len = dateTimeData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    dateTimeData.shift();
                }
            }

        },
    });

    var diseaseRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=disease',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            diseaseDetectionData = values;

            var len = diseaseDetectionData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    diseaseDetectionData.shift();
                }
            }

        },
    });

    var textureRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=texture',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            soilTextureData = values;

            var len = soilTextureData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    soilTextureData.shift();
                }
            }

        },
    });

    var weedRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=weed',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            weedPestData = values;

            var len = weedPestData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    weedPestData.shift();
                }
            }

        },
    });

    var yieldRequest = $.ajax({
        type: 'POST',
        url: '/getdata?data=yield',
        data: label,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            yieldPredictionData = values;

            var len = yieldPredictionData.length;
            if(len>20){
                var diff = len - 20;
                while(diff--){
                    yieldPredictionData.shift();
                }
            }

        },
    });

    $.when(dateTimeRequest, diseaseRequest, textureRequest, yieldRequest, weedRequest).then(function(){
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

        $("#chartSpinner").hide();

        myChart = new Chart(ctx, {
            type: type,
            data: data,
        });

        updatePredictionTable();
    });
}
