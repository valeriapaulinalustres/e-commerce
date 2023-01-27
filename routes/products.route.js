import { Router } from "express";
const router = Router()
import ProductManager from '../ProductManager.js'


const productManager = new ProductManager()


router.get('/',  async (req, res) => {
  // console.log("query", req.query);
   let products = await productManager.getProducts(req.query)
   res.json({ mensaje: "Productos encontrados encontrados", productos: products })
//   res.send('funciona')
})

router.get('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  const product = await productManager.getProductById(pid)
  res.json({ mensage: "producto encontrado", producto: product })
})

router.post('/', async (req, res)=>{
    let newProduct = req.body

    const newProductCreated = await productManager.addProduct(newProduct)
   // console.log(newProduct)
    res.json({mensage: "Producto creado con éxito", producto: newProductCreated})
})

export default router