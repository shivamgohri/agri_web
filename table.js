$(document).ready(function() {
});


function updateTable(){
    $.when(dateTimeRequest, otherRequest).then(function(){

        $("table thead").find('th').each(function(){
            $(this).parents("tr").remove();
        });

        if(label == "Air Quality"){
            var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + "Air-Quality Index" + "</th></tr>";
            $("table thead").append(markup);
        }
        else if(label == "Soil pH"){
            var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + " Soil-pH Index" + "</th></tr>";
            $("table thead").append(markup);
        }
        else if(label == "Soil Moisture"){
            var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + " Soil-Moisture Index" + "</th></tr>";
            $("table thead").append(markup);
        }
        else if(label == "Temperature"){
            var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + " Temperature Index" + "</th></tr>";
            $("table thead").append(markup);
        }
        else if(label == "Humidity"){
            var markup = "<tr><th>" + "Sr. No."  + "</th><th>"+ "Date-Time" +"</th><th>" + " Humidity Index" + "</th></tr>";
            $("table thead").append(markup);
        }

        $("table tbody").find('td').each(function(){
            $(this).parents("tr").remove();
        });

        for (let index = 0; index < dateTimeData.length; index++) {
            var i = index+1;
            var date = dateTimeData[index];
            var val = otherData[index];

            var markup = "<tr><td class='sr'><input type='checkbox' class='rowButton' data-toggle='modal' data-target='#myModal'/>" + i + "</td> <td class='date'>" + date + "</td> <td class='val'>" + val + "</td></tr>";
            $("table tbody").append(markup);
        }

        getRowData();
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

            var markup = "<tr><td class='sr'><input type='checkbox' class='rowButton' data-toggle='modal' data-target='#myModal'>" + i + "</td><td class='date'>" + date + "</td><td class='diseaseVal'>" + diseaseVal + "</td><td class='soilVal'>" + soilVal + "</td><td class='weedVal'>" + weedVal + "</td><td class='yieldVal'>" + yieldVal + "</td></tr>";
            $("table tbody").append(markup);
        }

        getPredictionData();
    });
}


function getRowData(){

  $(".rowButton").change(function() {
    if(this.checked){

      var $row = $(this).closest("tr");    // Find the row
      var $number = $row.find(".sr").text();
      var $date = $row.find(".date").text();
      var $val = $row.find(".val").text();

      $(".modalText").empty();

      var markup = "" + $number + ". <br>" + label + " index at " + $date + " is " + $val + " !";
      $(".modalText").append(markup);

      $("#closeModal1").click(function() {
        $(".rowButton").removeAttr('checked');
      });

      $("#closeModal2").click(function() {
        $(".rowButton").removeAttr('checked');
      });

    }
  });
}

function getPredictionData(){

  $(".rowButton").change(function() {
    if(this.checked){

      var $row = $(this).closest("tr");    // Find the row
      var $number = $row.find(".sr").text();
      var $date = $row.find(".date").text();
      var $diseaseVal = $row.find(".diseaseVal").text();
      var $soilVal = $row.find(".soilVal").text();
      var $weedVal = $row.find(".weedVal").text();
      var $yieldVal = $row.find(".yieldVal").text();

      $(".modalText").empty();

      var markup = "" + $number + ". " + label + "<br>" + $date + "<br>" + "Disease Detection is " + $diseaseVal + " !<br>" + "Soil Texture is " + $soilVal + " !<br>" + "Weed Detection is " + $weedVal + " !<br>" + "Yield Prediction is " + $yieldVal + " !<br>";
      $(".modalText").append(markup);

      $("#closeModal1").click(function() {
        $(".rowButton").removeAttr('checked');
      });

      $("#closeModal2").click(function() {
        $(".rowButton").removeAttr('checked');
      });

    }
  });
}















//a
