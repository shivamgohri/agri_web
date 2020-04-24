var dateTimeData, airQualityData;

var dateTimeRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function(json){
    dateTimeData = json;
});

var airQualityRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Air-Quality.json", function(json){
    airQualityData = json;
});

$.when(dateTimeRequest, airQualityRequest).then(function(){
    var data = {
        labels: dateTimeData,
        datasets: [
            {
                label: "Air Quality Index",
                fillColor: "rgba(220,0,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: airQualityData
            }]
    };

    var options = {
        scaleShowGridLines : true,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"
    };

    var ctx = document.getElementById("myChart").getContext("2d");

    ctx.font = "20px Georgia";
    ctx.strokeText("Hello World!", 10, 50);
    ctx.canvas.width = 800;
    ctx.canvas.height = 500;

    var myChart = new Chart(ctx).Line(data, options);
    myChart.removeData();
});



// $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Air-Quality.json", function (json) {
// //$.getJSON("https://skripsi-adeguntoro.firebaseio.com/sensor.json", function (json) {

//     $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Date-Time.json", function (json) {
//     dateTimeData = json.map(function(item) {
//         return item;
//     });
//     });

//     var labels = json.map(function(item) {
//         return item;
//     });
//     console.log(labels);
//     var data = {
//         labels: labels,
//         datasets: [
//             {
//                 label: "My First dataset",
//                 fillColor: "rgba(220,0,220,0.5)",
//                 strokeColor: "rgba(220,220,220,0.8)",
//                 highlightFill: "rgba(220,220,220,0.75)",
//                 highlightStroke: "rgba(220,220,220,1)",
//                 data: dateTimeData
//             }]
//     };
//     var ctx = document.getElementById("myChart").getContext("2d");
//     ctx.canvas.width = 800;
//     ctx.canvas.height = 500;
//     var myChart = new Chart(ctx).Line(data);
// });