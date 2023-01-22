import express from 'express'
const app = express()
import ProductManager from './ProductManager.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager()

app.get('/products', async (req, res) => {
  // console.log("query", req.query);
  let products = await productManager.getProducts(req.query)
  res.json({ mensaje: "Usuarios encontrados", productos: products })
  // res.send('funciona')
})

app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  const product = await productManager.getProductById(pid)
  res.json({ mensage: "usuario encontrado", producto: product })
})

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
})