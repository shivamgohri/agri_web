$(document).ready(function () {
    // Init
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
    $("#imageUpload").change(function () {
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
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    $("#weed_test1").click(function() {
        console.log("clicked1");
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/1.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=1',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    $("#weed_test2").click(function() {
        console.log("2");
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/2.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=2',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    $("#weed_test3").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/3.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=3',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    $("#weed_test4").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/4.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=4',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    $("#weed_test5").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/5.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=5',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    $("#weed_test6").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/6.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=6',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

    $("#weed_test7").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/7.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=7',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

    $("#weed_test8").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/8.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=8',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

    $("#weed_test9").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/9.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=9',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

    $("#weed_test10").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/10.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=10',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

    $("#weed_test11").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/11.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=11',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

    $("#weed_test12").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/weed_testcases/12.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'POST',
            url: '/weedtest?id=12',
            data: "hey",
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });





});
