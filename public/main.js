
// Inicializamos una constante para poder utilizar los sockets desde el cliente
const socket = io.connect();

// recibimos la lista de mensajes del back y la renderizamos en el front
socket.on('messages', messages => {
    renderChat(messages);
})



// inyecta los mensajes en la vista. Por cada mensaje recibido desde el back 
// busco el div con id "messages" e itero
function renderChat(messages) {
    messages.forEach(message => {
        $("#messages").append(
            `<span id="date">${message.author.date}</span>
            <img width=50px src='${message.author.avatar}'></img>
            <span id="firstName">${message.author.firstName}</span>
            <span id="lastName">${message.author.lastName}</span>
            <span id="alias">, alias ${message.author.alias}</span>
            <span id="age">(${message.author.age}):</span>
            <span id="text">${message.text}</span>
            <br>`)
    })
}

// cuando clickeo en el boton de enviar mensaje armo el objeto mensaje y lo envio al back
$("#chatForm").submit(e => {
    e.preventDefault();
    const message = {
        author: {
            date: `[${new Date().toLocaleString()}]`,
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val(),
            alias: $("#alias").val(),
            avatar: $("#avatar").val()
        },
        text: $("#msg").val()
    }
    
    // limpio el valor del input
    $("#msg")[0].value = "";
    
    // envio el mensaje al back
    socket.emit("newMessage", message);
    console.log(`Mensaje nuevo enviado al back ${message}`);
})