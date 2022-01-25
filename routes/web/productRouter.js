const express = require('express')
const { Router } = express;
const ProductController = require("../../controllers/web/ProductController")
const handlebars = require('express-handlebars');


const app = express();
const productRouter = Router()

// defino el motor de plantillas (habdlebars)
app.engine('handlebars', handlebars.engine())
// especifica la carpeta de plantillas (handlebars)
app.set('views', './public')
app.set('view engine', 'handlebars')

productRouter.get('/', ProductController.getProducts)

module.exports = productRouter