function updateTable(){
    $.when(dateTimeRequest, otherRequest).then(function(){

        $("table thead").find('th').each(function(){
            $(this).parents("tr").remove();
        });

        var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + "Index Value" + "</th></tr>";
        $("table thead").append(markup);

        $("table tbody").find('td').each(function(){
            $(this).parents("tr").remove();
        });

        for (let index = 0; index < dateTimeData.length; index++) {
            var i = index+1;
            var date = dateTimeData[index];
            var val = otherData[index];
            
            var markup = "<tr><td>" + i + "</td><td>" + date + "</td><td>" + val + "</td></tr>";
            $("table tbody").append(markup);            
        }

    });
}


function updatePredictionTable(){
    $.when(dateTimeRequest, otherRequest).then(function(){

        $("table thead").find('th').each(function(){
            $(this).parents("tr").remove();
        });

        var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + "Disease-Detection" + "</th><th>" + "Soil-Texture" + "</th><th>" + "Weed-Detection" + "</th><th>" + "Yield-Prediction" + "</th></tr>";
        $("table thead").append(markup);

        $("table tbody").find('td').each(function(){
            $(this).parents("tr").remove();
        });

        for (let index = 0; index < dateTimeData.length; index++) {
            var i = index+1;
            var date = dateTimeData[index];
            var diseaseVal = diseaseDetectionData[index];
            var soilVal = soilTextureData[index];
            var weedVal = weedPestData[index];
            var yieldVal = yieldPredictionData[index];
            
            var markup = "<tr><td>" + i + "</td><td>" + date + "</td><td>" + diseaseVal + "</td><td>" + soilVal + "</td><td>" + weedVal + "</td><td>" + yieldVal + "</td></tr>";
            $("table tbody").append(markup);            
        }

    });
}