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
            url: '/predictpest',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });


    $("#pest_test1").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/1.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=1',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });


    $("#pest_test2").click(function() {
        console.log("2");
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/2.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=2',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });


    $("#pest_test3").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/3.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=3',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });


    $("#pest_test4").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/4.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=4',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });


    $("#pest_test5").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/5.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=5',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });


    $("#pest_test6").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/6.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=6',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });

    $("#pest_test7").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/7.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=7',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });

    $("#pest_test8").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/8.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=8',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });

    $("#pest_test9").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/9.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=9',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });

    $("#pest_test10").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/10.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=10',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });

    $("#pest_test11").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/11.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=11',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });

    $("#pest_test12").click(function() {
        $('.image-section').hide();
        $('#btn-predict').hide();
        document.getElementById("TestImage").src = "static/pest_testcases/12.jpg";
        $('#TestImage').show();
        $('#imagePreview').hide();
        $.ajax({
            type: 'GET',
            url: '/pesttest?id=12',
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                var count = data.count; var text = data.text; var pixels = data.num; var total_pixels = data.total; $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html( "Result: " + text + " = " + count + "<br><br>" + "Pest Infected Pixels = " + pixels + "<br>" + "Total Image Pixels = " + total_pixels + "<br>" + "Area Covered (per Unit) = " + (pixels/total_pixels) );
                console.log('Success!');
            },
        });
    });




});
