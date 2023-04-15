import fs from 'fs'

export default class CartManager {
    constructor() {
        this.path = './carrito.json'
    }

    async addCart(cart) {
        try {
            const cartsFromFile = await this.getCarts()
            cartsFromFile.push({
                id: await this.#generarId(),
                products: cart
            })
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFromFile))
            return cartsFromFile
        } catch (error) {
            console.log(error)
        }
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                let cartsFromFile = await fs.promises.readFile(this.path, 'utf-8')
                let cartsFromFileStringified = JSON.parse(cartsFromFile)

                return cartsFromFileStringified
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cid) {
        try {
            const cartsFromFile = await this.getCarts()
            const cartFoundById = cartsFromFile.find(el => el.id === parseInt(cid))
            if (cartFoundById) {
                return cartFoundById
            } else {
                console.log("El id del carrito es inexistente")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cartsFromFile = await this.getCarts()
            const cartFoundById = await this.getCartById(parseInt(cid))
            const productInCart = cartFoundById.products.find(el => el.id === parseInt(pid))
            const cartIndex = cartsFromFile.findIndex(el => el.id === cid)
            const productIndex = cartsFromFile[cartIndex].products.findIndex(el => el.id === parseInt(pid))
            if (productInCart) {

                cartsFromFile[cartIndex].products[productIndex].quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFromFile))
                return cartsFromFile[cartIndex]
            } else {
                cartsFromFile[cartIndex].products.push({ id: parseInt(pid), quantity: 1 })
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFromFile))
                console.log(cartsFromFile);
                return cartsFromFile[cartIndex]
            }
        } catch (error) {
            console.log(error)
        }
    }

    async #generarId() {
        const cartsFromFile = await this.getCarts()
        let id = 1
        if (cartsFromFile.length !== 0) {
            id = cartsFromFile[cartsFromFile.length - 1].id + 1
        }
        return id
    }
}