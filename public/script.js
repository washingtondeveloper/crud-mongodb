$(function(){

    $("a[href='#']").click(function(){
        
       $.ajax({
           method: "GET",
           url: "http://localhost:3000/cadastrar/editar/"+$(this).attr("data-valor"),
           success: function(data){
                $("input[type='hidden']").attr("value", data._id);
                $("input[name='nome']").attr("value", data.nome);
                $("input[name='email']").attr("value", data.email);
           },
           error: function(data){
               console.log("Error");
           }
       });
    });
});