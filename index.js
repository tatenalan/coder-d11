const express = require("express")
const mongoose = require('mongoose')
const ServiceException = require("./exceptions/ServiceException");
const productRouterApi = require('./routes/api/productRouter')
const productRouter = require('./routes/web/productRouter') // hacerlo andar

const handlebars = require('express-handlebars'); // borrar luego
const Product = require("./models/Product"); // borrar luego

//------------------------------------------------------------------------
// instancias

const app = express();

//------------------------------------------------------------------------
// configuro el servidor y la DB

// DB
const URL = "mongodb://localhost:27017/desafio11";
mongoose.connect(URL, () => console.log(`MongoDB connected`))

//PORT - Server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Running on ${PORT}`))
server.on('error', error => console.log(`Error on server ${error}`))

//------------------------------------------------------------------------
// Llamo a las rutas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', productRouterApi)
// app.use('/products', productRouter)


//------------------------------------------------------------------------
// rutas WEB BORRAR LUEGO


// defino el motor de plantillas (habdlebars)
app.engine('handlebars', handlebars.engine())
// especifica la carpeta de plantillas (handlebars)
app.set('views', './public')
app.set('view engine', 'handlebars')

app.get("/products", async (req, res) => {
    const products = await Product.find().lean()
    res.render('index', {products})
})

app.get("/products-test", async (req, res) => {
    res.render('productsTest')
})

// ruta 404
app.get('*', (req, res) => {
    res.status(404);
    res.json(new ServiceException(-2, `The route ${req.originalUrl} with method ${req.method} does not exist`))
})  
