import { Router } from "express";
const router = Router()
//import ProductManager from '../dao/fileManagers/ProductManager.js'
import ProductManager from '../dao/mongoManagers/ProductManager.js'



const productManager = new ProductManager()


router.get('/', async (req, res) => {
    let products = await productManager.getProducts(req.query)

   // res.json({ mensaje: "Productos encontrados encontrados", productos: products })
   res.render('home', {products})
})

router.get('/:pid', async (req, res) => { 
    const product = await productManager.getProductById(req.params.pid)
    res.json({ mensage: "Producto encontrado por id", producto: product })
})

router.post('/', async (req, res) => {
    let newProduct = req.body

    const newProductCreated = await productManager.addProduct(newProduct)
    res.json({ mensage: "Producto creado con éxito", producto: newProductCreated })
})

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const newProduct = req.body
  
    // const newTitle = req.body.title
    // const newDescription = req.body.description
    // const newPrice = req.body.price
    // const newStock = req.body.stock
    // const newCode = req.body.code
    // const newCategory = req.body.category
    // const newThumbnails = req.body.thumbnails
    const updatedProduct = await productManager.updateProduct(pid, 
        // newTitle, newDescription, newPrice, newStock, newCode, newCategory, newThumbnails,
        newProduct)
    res.json({ mensaje: "Producto actualizado con éxito", producto: updatedProduct })
})

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const deletedProduct = await productManager.deleteProduct(pid)
    res.json({ mensaje: "Producto borrado con éxito", producto: deletedProduct })
})

export default router