import {
    getProducts, 
    getProductById, 
    addProduct, 
    deleteProduct, 
    updateProduct,
    mockedProducts
} from '../persistencia/productsPersistence.js'

export async function getProductsService(limit, page, sort, category, user){
    const products = await getProducts(limit, page, sort, category, user)
    return products
}

export async function getProductByIdService(id){
    const product = await getProductById(id)
    return product
}

export async function addProductService(product){
    const newProduct = await addProduct(product)
    return newProduct
}

export async function deleteProductService(id){
    const deletedProduct = await deleteProduct(id)
    return deletedProduct
}

export async function updateProductService(id, newProduct){
    const editedProduct = await updateProduct(id, newProduct)
    return editedProduct
}

export async function mockedProductsService(){
    const products = await mockedProducts()
    return products
}