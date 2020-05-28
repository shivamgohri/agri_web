$("#pdfButton").click(function() {
    downloadPdf();
});

function downloadPdf(){
    var doc = new jsPDF('p','pt','a4')

    doc.setProperties({
      title: 'Smart AGRI data',
      subject: 'Field data downloaded!',
      author: 'Smart AGRI',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'Shivam Gohri'
    });

    if(label == "Air Quality"){
        doc.text(50, 40, "Air Quality Data");
    }
    else if(label == "Soil pH"){
        doc.text(50, 40, "Soil pH Data");
    }
    else if(label == "Soil Moisture"){
        doc.text(50, 40, "Soil Moisture Data");
    }
    else if(label == "Temperature"){
        doc.text(50, 40, "Temperature Data");
    }
    else if(label == "Humidity"){
        doc.text(50, 40, "Humidity Data");
    }
    else if(label == "Prediction Models"){
        doc.text(50, 40, "Prediction Models Data");
    }

    doc.autoTable({ html: '#dataTable' })

    //footer
    var str = "Page 1 of 1";
    doc.setFontSize(10);// optional
    doc.text(str, 30, doc.internal.pageSize.height - 10);

    $("#download").toast('show');

    if(label == "Air Quality"){
        doc.save("air-quality-data.pdf");
    }
    else if(label == "Soil pH"){
        doc.save("soil-ph-data.pdf");
    }
    else if(label == "Soil Moisture"){
        doc.save("soil-moisture-data.pdf");
    }
    else if(label == "Temperature"){
        doc.save("temperature-data.pdf");
    }
    else if(label == "Humidity"){
        doc.save("humidity-data.pdf");
    }
    else if(label == "Prediction Models"){
        doc.save("prediction-models-data.pdf");
    }
}


function showImage() {

    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child('Power system stability 2.pdf');
    storageRef.child('logs.pdf').getDownloadURL().then(function(url) {
        var test = url;
        document.querySelector('iframe').src = test;
        $("#logFrame").show();
        $("#LOGspinner").hide();

    }).catch(function(error) {

    });

}


function generateLogPdf(){

    $("#spinnerLOGS").show();

    var doc = new jsPDF('p','pt','a4')

    doc.setProperties({
      title: 'Smart AGRI Logs',
      subject: 'Logs downloaded!',
      author: 'Smart AGRI',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'Shivam Gohri'
    });

    var dateData, airData, phData, moistureData, temperatureData, humidityData, diseaseData, textureData, weedData, yieldData;

    var first = $.ajax({
        type: 'POST',
        url: '/getdata?data=date',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            dateData = values;
        },
    });

    var second = $.ajax({
        type: 'POST',
        url: '/getdata?data=air',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            airData = values;
        },
    });

    var third = $.ajax({
        type: 'POST',
        url: '/getdata?data=ph',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            phData = values;
        },
    });

    var forth = $.ajax({
        type: 'POST',
        url: '/getdata?data=moisture',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            moistureData = values;
        },
    });

    var fifth = $.ajax({
        type: 'POST',
        url: '/getdata?data=temperature',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            temperatureData = values;
        },
    });

    var sixth = $.ajax({
        type: 'POST',
        url: '/getdata?data=humidity',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            humidityData = values;
        },
    });

    var seventh = $.ajax({
        type: 'POST',
        url: '/getdata?data=disease',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            diseaseData = values;
        },
    });

    var eight = $.ajax({
        type: 'POST',
        url: '/getdata?data=texture',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            textureData = values;
        },
    });

    var nine = $.ajax({
        type: 'POST',
        url: '/getdata?data=weed',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            weedData = values;
        },
    });

    var ten = $.ajax({
        type: 'POST',
        url: '/getdata?data=yield',
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: function (data) {
            // Get and display the result
            var values = Object.keys(data).map(function (key) { return data[key]; });
            yieldData = values;
        },
    });


    $.when(first, second, third, forth, fifth, sixth, seventh, eight, nine, ten).then(function(){

        //airData
        var col1 = ["Sr. No.", "Date-Time", "Air Quality Index"];
        var col2 = ["Sr. No.", "Date-Time", "Soil pH Index"];
        var col3 = ["Sr. No.", "Date-Time", "Soil Moisture Index"];
        var col4 = ["Sr. No.", "Date-Time", "Temperature Index"];
        var col5 = ["Sr. No.", "Date-Time", "Humidity Index"];
        var col6 = ["Sr. No.", "Date-Time", "Disease Results", "Texture Results", "Weed&Pest Results", "Yield Results"];

        var row1 = [];
        var row2 = [];
        var row3 = [];
        var row4 = [];
        var row5 = [];
        var row6 = [];

        for (var i = 0; i < dateData.length; i++) {

            var temp1 = [ i+1, dateData[i], airData[i] ];
            var temp2 = [ i+1, dateData[i], phData[i] ];
            var temp3 = [ i+1, dateData[i], moistureData[i] ];
            var temp4 = [ i+1, dateData[i], temperatureData[i] ];
            var temp5 = [ i+1, dateData[i], humidityData[i] ];
            var temp6 = [ i+1, dateData[i], diseaseData[i], textureData[i], weedData[i], yieldData[i] ];

            row1.push(temp1);
            row2.push(temp2);
            row3.push(temp3);
            row4.push(temp4);
            row5.push(temp5);
            row6.push(temp6);

        }

        doc.autoTable(col1, row1, { startY: 10 });
        doc.addPage()
        doc.autoTable(col2, row2, { startY: 10 });
        doc.addPage()
        doc.autoTable(col3, row3, { startY: 10 });
        doc.addPage()
        doc.autoTable(col4, row4, { startY: 10 });
        doc.addPage()
        doc.autoTable(col5, row5, { startY: 10 });
        doc.addPage()
        doc.autoTable(col6, row6, { startY: 10 });

        $("#spinnerLOGS").hide();
        $("#logs_toast").toast('show');

        doc.save('logs.pdf');

    });


}































//
