import {
  getProductsService,
  getProductByIdService,
  addProductService,
  deleteProductService,
  updateProductService,
} from "../services/products.services.js";

export const getProductsController = async (req, res) => {
  const { limit = 10, page = 1, sort, category } = req.query;
  try {
    let userName = req.user.first_name;
    let user = req.user
    let products = await getProductsService(limit, page, sort, category, user); //category en la url va sin comillas
 
    //res.json({ mensaje: response })
    res.render("products", { products, userName });
  } catch (error) {
    console.log("error");
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.pid);
    res.json({ mensage: "Producto encontrado por id", producto: product });
  } catch (error) {
    console.log("error");
  }
};

export const addProductController = async (req, res) => {
  try {
    let newProduct = req.body;

    const newProductCreated = await addProductService(newProduct);
    res.json({
      mensage: "Producto creado con éxito",
      producto: newProductCreated,
    });
  } catch (error) {
    console.log("error");
  }
};

export const updateProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const newProduct = req.body;
    const updatedProduct = await updateProductService(pid, newProduct);
    res.json({
      mensaje: "Producto actualizado con éxito",
      producto: updatedProduct,
    });
  } catch (error) {
    console.log("error");
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await deleteProductService(pid);
    res.json({
      mensaje: "Producto borrado con éxito",
      producto: deletedProduct,
    });
  } catch (error) {
    console.log("error");
  }
};
