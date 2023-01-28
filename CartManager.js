import fs from 'fs'

export default class CartManager {
    constructor() {
        this.path = './carrito.json'
    }

    async addCart(cart) {
        //console.log(cart)
        try {
            const cartsFromFile = await this.getCarts()
            //console.log('aqui', cartsFromFile)
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

    async getCartById (cid) {
        try {
            const cartsFromFile = await this.getCarts()
            const cartFoundById = cartsFromFile.find(el=> el.id === cid)
            if (cartFoundById) {
                return cartFoundById
            } else {
                console.log("El id del carrito es inexistente")
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