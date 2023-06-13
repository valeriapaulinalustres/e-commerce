import {
  getProductsService,
  getProductByIdService,
  addProductService,
  deleteProductService,
  updateProductService,
  mockedProductsService,
} from "../services/products.services.js";
import CustomError from "../utils/errors/CustomError.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../utils/errors/errorsEnum.js";

export const getProductsController = async (req, res) => {
  const { limit = 10, page = 1, sort, category } = req.query;
  if (typeof limit !== "number" || typeof page !== "number") {
    CustomError.createCustomError({
      name: ErrorsName.PRODUCT_DATA_INCORRECT_TYPE,
      cause: ErrorsCause.PRODUCT_DATA_INCORRECT_TYPE,
      message: ErrorsMessage.PRODUCT_DATA_INCORRECT_TYPE,
    });
  }

  try {
   // let userName = req.user.first_name;
    let user = req.user;
    let products = await getProductsService(limit, page, sort, category, user); //category en la url va sin comillas

    res.json({ response: products }); //esta se usará con el front de React
    //res.render("products", { products, userName });
  } catch (error) {
    console.log('error')
   // logger.error('Error del controller', error)
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    let id = req.params.pid;
    const product = await getProductByIdService(id);
    res.json({ response: product });
  } catch (error) {
    logger.error('Error del controller', error)
    return error;
  }
};

export const addProductController = async (req, res) => {
  
  try {
 
    let product = req.body.newProduct;
    let owner = req.body.owner
 
    const newProductCreated = await addProductService(product, owner);
    res.json({ response: newProductCreated });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const updateProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body.updatedProduct;
    const owner = req.body.owner;
    const updatedProductFromDb = await updateProductService(pid, updatedProduct,owner);
    res.json({
      response: updatedProductFromDb,
    });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const deleteProductController = async (req, res) => {

  try {
    const pid = req.params.pid;
    let owner = req.body.owner;
    const deletedProduct = await deleteProductService(pid, owner);
    res.json({
      response: deletedProduct,
    });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const mockedProductsController = async (req, res) => {

  try {
    const products = await mockedProductsService();
    res.json({ response: products });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};
