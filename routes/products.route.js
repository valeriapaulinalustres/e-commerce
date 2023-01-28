import { Router } from "express";
const router = Router()
import ProductManager from '../ProductManager.js'


const productManager = new ProductManager()


router.get('/', async (req, res) => {
    let products = await productManager.getProducts(req.query)
    res.json({ mensaje: "Productos encontrados encontrados", productos: products })
})

router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const product = await productManager.getProductById(pid)
    res.json({ mensage: "Producto encontrado por id", producto: product })
})

router.post('/', async (req, res) => {
    let newProduct = req.body

    const newProductCreated = await productManager.addProduct(newProduct)
    res.json({ mensage: "Producto creado con éxito", producto: newProductCreated })
})

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const newTitle = req.body.title
    const updatedProduct = await productManager.updateProduct(pid, newTitle)
    res.json({ mensaje: "Producto actualizado con éxito", producto: updatedProduct })
})

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const deletedProduct = await productManager.deleteProduct(pid)
    res.json({ mensaje: "Producto borrado con éxito", producto: deletedProduct })
})

export default router