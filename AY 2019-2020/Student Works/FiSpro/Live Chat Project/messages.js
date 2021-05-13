var socket = io.connect();

// getting the input from the user
$("form#chat").submit(function(e) {
    e.preventDefault();
 
   socket.emit("send message", $(this).find("#input").val(), function() {
     $("form#chat #input").val("");
   });
});
           
socket.on("update messages", function(msg){
    var final_message = $("<li />").text(msg);
    $("#messages").append(localStorage.uname, final_message);
});