import { Router } from "express";
import { 
    addProductController, 
    deleteProductController, 
    getProductByIdController, 
    getProductsController, 
    updateProductController ,
    mockedProductsController
} from "../controllers/products.controller.js";
import { verificarUsuarioPremiumOAdmin } from "../middlewares/auth.js";


const router = Router()

// --- Trae los productos ---
router.get('/', getProductsController)

// --- Mockea productos ---
router.get('/mockingproducts', mockedProductsController)

// --- Trae producto por id ---
router.get('/:pid', getProductByIdController)

// --- Agrega producto ---
router.post('/', verificarUsuarioPremiumOAdmin, addProductController)

// --- Actualiza producto ---
router.put('/:pid', verificarUsuarioPremiumOAdmin, updateProductController)

// --- Elimina un producto ---
router.delete('/:pid', verificarUsuarioPremiumOAdmin, deleteProductController)

export default router