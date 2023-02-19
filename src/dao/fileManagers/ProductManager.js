import fs from 'fs'

export default class ProductManager {

    constructor() {
        this.path = './products.json'
    }

    async addProduct(products) {
        try {
            const productsFromFile = await this.getProducts()

            const { title, description, price, thumbnails, code, stock, status, category } = products
            if (!title || !description || !price || !thumbnails || !code || !stock || !status || !category) {
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
                        status: true,
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
            const productoEncontradoPorId = productsFromFile.find(el => parseInt(productoId) === el.id)
            if (productoEncontradoPorId) {
                console.log('Product found', productoEncontradoPorId);
                return productoEncontradoPorId
            } else {
                console.log('Product not found by id');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, newProduct){
        try {
            const productsFromFile = await this.getProducts()

            const productToUpdate = await this.getProductById(parseInt(id))
            const productToUpdateIndex = productsFromFile.findIndex(el => el.id === parseInt(id))
            if (productToUpdate) {
              newProduct.title && (productsFromFile[productToUpdateIndex].title = newProduct.title) 
               newProduct.description && (productsFromFile[productToUpdateIndex].description = newProduct.description)
               newProduct.price && (productsFromFile[productToUpdateIndex].price = newProduct.price)
               newProduct.stock && (productsFromFile[productToUpdateIndex].stock = newProduct.stock)
               newProduct.code && (productsFromFile[productToUpdateIndex].code = newProduct.code)
               newProduct.category && (productsFromFile[productToUpdateIndex].category = newProduct.category)
              newProduct.thumbnails &&  (productsFromFile[productToUpdateIndex].thumbnails = newProduct.thumbnails)


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
            const productToDeleteIndex = productsFromFile.findIndex(el => el.id === parseInt(id))
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

// async updateProduct(prod){
//     const prodToUpdate = await this.getProductsById(parseInt(prod.id))
//     const newProd = {
//         title: prod.title ? prod.title : prodToUpdate.title,
//         description: prod.description ? prod.description : prodToUpdate.description,
//         price: prod.price ? prod.price : prodToUpdate.price,
//         stock: prod.stock ? prod.stock : prodToUpdate.stock,
//         code: prod.code ? prod.code : prodToUpdate.code,
//         category: prod.category ? prod.category : prodToUpdate.category,
//         status: true,
//         thumbnails: prod.thumbnails ? prod.thumbnails : prodToUpdate.thumbnails || " ",
//         id: parseInt(prod.id)
//     }
//     this.products.push(newProd)
//     const indexProdToUpdate = this.products.indexOf(prodToUpdate)
//     this.products.splice(indexProdToUpdate, 1)
//     await fs.promises.writeFile(this.path, JSON.stringify(this.products))
//     return newProd
// }

// async addProducts(prod){

//     try {
    
//     const prodsFile = await this.getProducts()
//     const productCode = this.#validateCodeProduct(prod.code)

//     const product = {
//         id: this.#generateId(),
//         status: true,
//         ...prod
//     }

//     if(productCode === undefined && prod.title && prod.description && prod.price && prod.stock && prod.code && prod.category){

//         prodsFile.push(product)
//         await fs.promises.writeFile(this.path, JSON.stringify(prodsFile))}}

//     catch(error){
//         console.log("error")
//     }

// }



