import {
    addCartService, 
    getCartsService, 
    getCartByIdService, 
    addProductToCartService, 
    deleteProductFromCartService, 
    emptyCartService, 
    editProductQtyService, 
    editCartService,
    completeSaleService 

} from '../services/carts.services.js'

export const addCartController = async (req, res) => {
    try {
        const cart = req.body
        const addedCart = await addCartService(cart)
        res.json({ mensaje: "Carrito agregado", carrito: addedCart })
    } catch (error) {
        console.log('errro');
    }
   
}

export const getCartsController = async (req,res)=>{
    try {
        const carts = await getCartsService()
        res.json({mensaje: 'carritos encontrados', carritos: carts})
    } catch (error) {
        console.log('error');
    }
   
}

export const getCartByIdController =  async (req, res) => {
    try {
        const cid = req.params.cid
        const cartFoundById = await getCartByIdService(cid)
        //res.json({ mensaje: "Carrito encontrado por id", carrito: cartFoundById })
        let cart = cartFoundById.products
        res.json({mensaje: cart})
     //   res.render('cart', {cart})
    } catch (error) {
        console.log('error');
    }
   
}

export const addProductToCartController = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const addedProduct = await addProductToCartService(cid, pid)
        res.json({ mensaje: `Producto agregado a carrito ${cid}`, carrito: addedProduct })
    } catch (error) {
        console.log('error')
    }
  
}

export const deleteProductFromCartController = async (req,res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const deletedProduct = await deleteProductFromCartService(cid, pid)
        res.json({ mensaje: `Producto eliminado del carrito ${cid}`, carrito: deletedProduct })
    } catch (error) {
        console.log('error');
    }
}

export const emptyCartController = async(req,res)=>{
    try {
        const cid = req.params.cid
        const emptyCart = await emptyCartService(cid)
        res.json({ mensaje: `Carrito ${cid} vaciado` })
    } catch (error) {
        console.log('error')
    }
   
}

export const editProductQtyController = async (req,res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        console.log('aca',quantity)
        const editedProductQty = await editProductQtyService(cid,pid,quantity)
        res.json({mensaje: `Producto editado: ${editedProductQty}`})
    } catch (error) {
        console.log('error');
    }
   
}

export const editCartController = async(req,res)=>{
    try {
        const cid = req.params.cid
        const newCart = req.body.cart
        console.log(newCart)
        const editedCart = await editCartService(cid, newCart)
        res.json({mensaje: `Carrito editado: ${editedCart}`})
    } catch (error) {
        console.log('error');
    }
  
}

export const completeSaleController = async (req,res)=>{
    try {
        console.log('viene de session de cart', req.session, req.cookies, req.user)
       
        const buyer = req.user
console.log('buyer', buyer)
            const cid= req.params.cid
            const algo = await completeSaleService(cid, buyer.full_name)
            // algo.ticket = {...algo.ticket, purchaser: req.cookies.user.user.email}
            console.log('del controller', algo)


            res.json({mensaje: `Carrito actualizado`})

   
       
    } catch (error) {
        console.log('error')
    }
}

