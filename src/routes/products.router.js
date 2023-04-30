import { Router } from "express";
import { 
    addProductController, 
    deleteProductController, 
    getProductByIdController, 
    getProductsController, 
    updateProductController ,
    mockedProductsController
} from "../controllers/products.controller.js";
import {verificarUsuarioAdmin} from '../middlewares/auth.js'
import { generateProduct } from "../mocks.js";

const router = Router()
//import ProductManager from '../dao/mongoManagers/ProductManager.js'



//const productManager = new ProductManager()


router.get('/', getProductsController
// async (req, res) => {
//     const { limit = 10, page = 1, sort, category } = req.query

//     let products = await productManager.getProducts(limit, page, sort, category) //category en la url va sin comillas
// let user = req.session.name
//     //res.json({ mensaje: response })
//      res.render('products', {products, user})
// }
)

router.get('/mockingproducts', mockedProductsController

)

router.get('/:pid', getProductByIdController
// async (req, res) => {
//     const product = await productManager.getProductById(req.params.pid)
//     res.json({ mensage: "Producto encontrado por id", producto: product })
// }
)

router.post('/', //verificarUsuarioAdmin, 
addProductController
// async (req, res) => {
//     let newProduct = req.body

//     const newProductCreated = await productManager.addProduct(newProduct)
//     res.json({ mensage: "Producto creado con éxito", producto: newProductCreated })
// }
)

router.put('/:pid', verificarUsuarioAdmin, updateProductController
// async (req, res) => {
//     const pid = req.params.pid
//     const newProduct = req.body
//     const updatedProduct = await productManager.updateProduct(pid, newProduct)
//     res.json({ mensaje: "Producto actualizado con éxito", producto: updatedProduct })
// }
)

router.delete('/:pid', verificarUsuarioAdmin, deleteProductController
// async (req, res) => {
//     const pid = req.params.pid
//     const deletedProduct = await productManager.deleteProduct(pid)
//     res.json({ mensaje: "Producto borrado con éxito", producto: deletedProduct })
// }
)



export default router