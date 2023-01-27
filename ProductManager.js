import fs from 'fs'

export default class ProductManager {

    constructor() {
        this.path = './products.json'
    }

    async addProduct(products) {
        try {
            const productsFromFile = await this.getProducts()
console.log(products)
            const { title, description, price, thumbnails, code, stock, status, category } = products
            if (!title   || !description || !price || !thumbnails || !code || !stock || !status || !category) {
                console.log('Falta completar datos del producto');
            } else {
                const nuevoProducto = await this.#evaluarSiExisteProducto(code);
                if (nuevoProducto) {
                    console.log('error, producto ya existente, código repetido');
                } else {
                    productsFromFile.push({
                        title,
                        description,
                        price,
                        thumbnails,
                        code,
                        stock,
                        status,
                        category,
                        id: await this.#generarId(),
                    })
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFromFile))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(query) {
        let limit
        query && (limit = query.limit)
        try {
            if (fs.existsSync(this.path)) {
                let productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
                let productsFromFileStringified = JSON.parse(productsFromFile)
                if (limit) {
                    return productsFromFileStringified.slice(0, limit)
                }
                return productsFromFileStringified
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(productoId) {

        try {
            const productsFromFile = await this.getProducts()
            const productoEncontradoPorId = productsFromFile.find(el => productoId === el.id)
            if (productoEncontradoPorId) {
                console.log('Product found', productoEncontradoPorId);
                return productoEncontradoPorId
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, newTitle) {
        try {

            const productsFromFile = await this.getProducts()

            const productToUpdate = await this.getProductById(id)
            const productToUpdateIndex = productsFromFile.findIndex(el => el.id === id)
            if (productToUpdate) {
                productsFromFile[productToUpdateIndex].title = newTitle
                await fs.promises.writeFile(this.path, JSON.stringify(productsFromFile))
                console.log(`New title ${productToUpdate.title}`)
                return productToUpdate
            } else {
                console.log('This product does not exist');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const productsFromFile = await this.getProducts()
            const productToDeleteIndex = productsFromFile.findIndex(el => el.id === id)
            if (productToDeleteIndex == -1) {
                console.log('Product not found');
            } else {
                const deletedProduct = productsFromFile.splice(productToDeleteIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsFromFile))
                return deletedProduct
            }

        } catch (error) {
            console.log(error);
        }

    }

    async #evaluarSiExisteProducto(code) {
        const productsFromFile = await this.getProducts()
        return productsFromFile.find(el => el.code === code)
    }

    async #generarId() {
        const productsFromFile = await this.getProducts()
        let id = 1
        if (productsFromFile.length !== 0) {
            id = productsFromFile[productsFromFile.length - 1].id + 1
        }
        return id
    }
}



