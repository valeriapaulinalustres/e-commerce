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
    let userName = req.user.first_name;
    let user = req.user;
    let products = await getProductsService(limit, page, sort, category, user); //category en la url va sin comillas

    res.json({ response: products }); //esta se usará con el front de React
    //res.render("products", { products, userName });
  } catch (error) {
    console.log("Error desde el controller: ", error);
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    let id = req.params.pid;
    const product = await getProductByIdService(id);
    res.json({ response: product });
  } catch (error) {
    console.log("Error desde el controller", error);
    return error;
  }
};

export const addProductController = async (req, res) => {
  try {
    let newProduct = req.body;
    const newProductCreated = await addProductService(newProduct);
    res.json({ response: newProductCreated });
  } catch (error) {
    console.log("Error desde el controller: ", error);
  }
};

export const updateProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const newProduct = req.body;
    const updatedProduct = await updateProductService(pid, newProduct);
    res.json({
      reponse: updatedProduct,
    });
  } catch (error) {
    console.log("Error desde el controller: ", error);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await deleteProductService(pid);
    res.json({
      response: deletedProduct,
    });
  } catch (error) {
    console.log("Error desde el controller: ", error);
  }
};

export const mockedProductsController = async (req, res) => {

  try {
    const products = await mockedProductsService();
    res.json({ response: products });
  } catch (error) {
    console.log("Error desde el controller: ", error);
  }
};
