import { productsModel } from '../models/products.model.js'

export default class ProductManager {

    async getProducts(limit,page, sort) {

       const options = {
limit: limit,
page: page,
sort: sort ? {price: sort} : {}
       }

    
       // query && (limit = query.limit)
        try {
            //.lean() para que devuelva en json y lo muestre handlebars
            const allProductsDB = await productsModel.paginate({},options)

const response = {
    status: 'success',
    payload: allProductsDB.docs,
    totalPages: allProductsDB.totalPages,
    prevPage: allProductsDB.prevPage,
    nextPage: allProductsDB.nextPage,
    hasPrevPage: allProductsDB.hasPrevPage,
    hasNextPage: allProductsDB.hasNextPage,
    prevLink: allProductsDB.prevPage ? `https://localhost8080/api/products?page=${allProductsDB.prevPage}` : null,
    nextLink: allProductsDB.nextPage ? `https://localhost8080/api/products?page=${allProductsDB.nextPage}` : null,
}
console.log(allProductsDB.docs)


            return allProductsDB.docs

            // if (limit) {
            //     return allProductsDB.slice(0, limit)
            // } else { return allProductsDB }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getProductById(productoId) {
        try {
            const productIdDB = await productsModel.findById(productoId).lean()
            return productIdDB
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async addProduct(product) {
        try {
            const newProduct = await productsModel.create(product)
            return newProduct
        } catch (error) {
            console.log(error)
            return error
        }
    }


    async deleteProduct(id) {
        try {
            const deletedProduct = await productsModel.findByIdAndDelete(id)
            return deletedProduct
        } catch (error) {
            console.log(error)
            return error
        }
    }

    

    async updateProduct (id, newProduct) {
        try {
            const updatedProduct = await productsModel.findByIdAndUpdate(id, {
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                code: newProduct.code,
                stock: newProduct.stock,
            }, {new: true})
            return updatedProduct
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
