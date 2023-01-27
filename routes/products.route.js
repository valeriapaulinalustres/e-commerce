import { Router } from "express";
const router = Router()
import ProductManager from '../ProductManager.js'


const productManager = new ProductManager()

router.get('/',  async (req, res) => {
  // console.log("query", req.query);
   let products = await productManager.getProducts(req.query)
   res.json({ mensaje: "Usuarios encontrados", productos: products })
//   res.send('funciona')
})

router.get('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  const product = await productManager.getProductById(pid)
  res.json({ mensage: "usuario encontrado", producto: product })
})

export default router