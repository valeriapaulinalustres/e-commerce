import { Router } from "express";
const router = Router()
//import ProductManager from '../dao/fileManagers/ProductManager.js'
import ProductManager from '../dao/mongoManagers/ProductManager.js'



const productManager = new ProductManager()


router.get('/', async (req, res) => {
    const {limit=10, page=1, sort=1, category} = req.query 

    let products = await productManager.getProducts(limit,page,sort,category)



   //res.json({ mensaje: response })
 //  res.render('products', {products})
 res.send(products)
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
    const pid = req.params.pid
    const newProduct = req.body
    const updatedProduct = await productManager.updateProduct(pid, newProduct)
    res.json({ mensaje: "Producto actualizado con éxito", producto: updatedProduct })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    const deletedProduct = await productManager.deleteProduct(pid)
    res.json({ mensaje: "Producto borrado con éxito", producto: deletedProduct })
})

export default router