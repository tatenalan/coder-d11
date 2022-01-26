const express = require("express");
const mongoose = require('mongoose');
const ServiceException = require("./exceptions/ServiceException");
const productRouterApi = require('./routes/api/productRouter');
const productRouter = require('./routes/web/productRouter');
const messageRouterApi = require('./routes/api/messageRouter');
const messageRouter = require('./routes/web/messageRouter');
const handlebars = require('express-handlebars');

//borrar luego
const fs = require('fs')
const Message = require("./models/Message");

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io')


//------------------------------------------------------------------------
// instancias

const app = express();

// chat
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//------------------------------------------------------------------------
// configuro el servidor y la DB

// DB
const URL = "mongodb://localhost:27017/desafio11";
mongoose.connect(URL, () => console.log(`MongoDB connected`))

//PORT - Server
const PORT = process.env.PORT || 8080;
// Arrancamos el servidor con http.listen() en lugar de app.listen()
const server = httpServer.listen(PORT, () => console.log(`Running on ${PORT}`))
server.on('error', error => console.log(`Error on server ${error}`))

//------------------------------------------------------------------------
// Llamo a las rutas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configura nuestro directorio estático
app.use(express.static(__dirname + '/public'));

// defino el motor de plantillas (habdlebars)
app.engine('handlebars', handlebars.engine())
// especifica la carpeta de plantillas (handlebars)
app.set('views', './public')
app.set('view engine', 'handlebars')


app.use('/api/products', productRouterApi)
app.use('/products', productRouter)
app.use('/api/messages', messageRouterApi)
app.use('/messages', messageRouter)

// ruta 404
app.get('*', (req, res) => {
    res.status(404);
    res.json(new ServiceException(-2, `The route ${req.originalUrl} with method ${req.method} does not exist`))
})


const data = fs.readFileSync(__dirname + '/data/chat.json', 'utf-8');
const messages = JSON.parse(data)

// 'connection' se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => {
    console.log("usuario conectado");
    // cuando se conecta un usuario enviamos todos los mensajes al front
    socket.emit('messages', messages)


    // recibimos un mensaje del front
    socket.on("newMessage", message => {
        //  lo guardamos en nuestro array de mensajes para mostrarselo a los nuevos usuarios que ingresen a través del socket "messages"
        Message.create(message)
        console.log('mensaje guardado');
        // Emitimos a todos los clientes
        io.sockets.emit("messages", message)   
    })
})

