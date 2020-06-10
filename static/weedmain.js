$(document).ready(function () {
    // Init
    $("#weedSpinner").hide();
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#TestImage').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function disableAll(){
        $("#weedSpinner").show();
        for (var i = 1; i <= 12; i++) {
            var name = "#weed_test" + i + "";
            $(name).addClass('disabled');
        }
        $("#btn-predict").addClass('disabled');
    }

    function enableAll(){
        $("#weedSpinner").hide();
        for (var i = 1; i <= 12; i++) {
            var name = "#weed_test" + i + "";
            $(name).removeClass('disabled');
        }
        $("#btn-predict").removeClass('disabled');
    }

    function showResult(data) {
        hideResult();
        var pixels = data.num; 
        var total_pixels = data.total; 
        var result = data.text; 
        var picId = data.id;
        $('.loader').hide();
        $('#result').fadeIn(600);
        $('#result').html( "Result: " + result + "<br><br>" + "Weed Pixels Predicted = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per unit) = " + (pixels/total_pixels) );
        $("#imagePlots").html( "<img height='256px' src='static/results/w_graph_" + picId + ".jpg'>" );
        enableAll();
    }

    function hideResult(){
        disableAll();
        $('#result').html("");
        $("#imagePlots").html("");
    }

    $("#imageUpload").change(function () {
        $('#result').html("");
        $("#imagePlots").html("");
        $('.image-section').show();
        $('#TestImage').hide();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        hideResult();
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predictweed',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });


    $("#weed_test1").click(function() {
        console.log("clicked1");
        hideResult();
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/1.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=1',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });


    $("#weed_test2").click(function() {
        console.log("2");
        hideResult();
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/2.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=2',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });


    $("#weed_test3").click(function() {
        $('.image-section').hide();
        hideResult();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/3.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=3',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });


    $("#weed_test4").click(function() {
        $('.image-section').hide();
        hideResult();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/4.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=4',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });


    $("#weed_test5").click(function() {
        $('.image-section').hide();
        hideResult();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/5.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=5',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });


    $("#weed_test6").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/6.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=6',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });

    $("#weed_test7").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/7.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=7',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });

    $("#weed_test8").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/8.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=8',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });

    $("#weed_test9").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/9.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=9',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });

    $("#weed_test10").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/10.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=10',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });

    $("#weed_test11").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/11.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=11',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });

    $("#weed_test12").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        hideResult();
        document.getElementById("TestImage").src = "static/weed_testcases/12.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/weedtest?id=12',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                showResult(data);
            },
        });
    });





});
