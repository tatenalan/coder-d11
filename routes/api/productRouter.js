const express = require("express")
const ProductController = require("../../controllers/api/ProductController")
const { Router } = express;

const productRouter = Router()

productRouter.get('/', ProductController.getProducts)
productRouter.get('/:id', ProductController.getProduct)
productRouter.post('/', ProductController.insertProduct)
productRouter.put('/:id', ProductController.updateProduct)
productRouter.delete('/:id', ProductController.deleteProduct)
productRouter.delete('/', ProductController.deleteAll)

module.exports = productRouter