$(document).ready(function(){

    

    $(".add-row").click(function(){
        var name = $("#name").val();
        var email = $("#email").val();
        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + email + "</td></tr>";
        $("table tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row").click(function(){
        $("table tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
}); 

function updateTable(){
    $.when(dateTimeRequest, otherRequest).then(function(){

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