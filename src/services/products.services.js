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

export async function addProductService(product, owner){
    const newProduct = await addProduct(product, owner)
    return newProduct
}

export async function deleteProductService(id,owner){
    const deletedProduct = await deleteProduct(id,owner)
    return deletedProduct
}

export async function updateProductService(id, newProduct, owner){
    const editedProduct = await updateProduct(id, newProduct, owner)
    return editedProduct
}

export async function mockedProductsService(){
    const products = await mockedProducts()
    return products
}