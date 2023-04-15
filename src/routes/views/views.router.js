import { Router } from "express";
const router = Router()
import ProductManager from '../../persistencia/DAO/mongoManagers/ProductManager.js'

const productManager = new ProductManager()

router.get('/', async (req, res) => {
    let products = await productManager.getProducts(req.query)
   res.render('realTimeProducts',{products}) 
})


export default router