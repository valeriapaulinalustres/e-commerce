import File from './DAO/fileManagers/ProductManager.js'
import MongoDb from './DAO/mongoManagers/ProductManager.js'
import {productsModel} from './mongodb/models/products.model.js'
import {Command} from 'commander'

const program = new Command();
program.option('-p', 'persistence', 'memory');
program.parse();

let persistence;

let argv = program.args[0]

switch (argv) {
    case 'fs':
        persistence = new File('./src/dao/fileSystem/products.json')
        break;
        case 'mongo':
            persistence = new MongoDb('Products', productsModel)
            break;
    default:
        break;
}

export async function getProducts(limit, page, sort, category, user) {
    return await persistence.getProducts(limit, page, sort, category, user)
}

export async function getProductById(productoId) {
    return await persistence.getProductById(productoId)
}

export async function addProduct(product) {
    return await persistence.addProduct(product)
}

export async function deleteProduct(id) {
    return await persistence.deleteProduct(id)
}

export async function updateProduct(id, product) {
    return await persistence.updateProduct(id, product)
}

export async function mockedProducts() {
    return await persistence.mockedProducts()
}

