$("#pdfButton").click(function() {
  $("#download").toast('show');

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

});































//
