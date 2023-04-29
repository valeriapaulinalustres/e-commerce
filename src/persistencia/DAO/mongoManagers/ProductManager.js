import CustomError from "../../../utils/errors/CustomError.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../utils/errors/errorsEnum.js";
import { productsModel } from "../../mongodb/models/products.model.js";

export default class ProductManager {
  async getProducts(limit, page, sort, category, user) {
    const filter = {};
    if (category) filter.category = category;

    const options = {
      limit: limit,
      page: page,
      sort: { price: sort },
      category: category,
      //lean: true //este sirve para que ande handlebars en lugar de hacer el artilugio del ProductManaer.
    };

    try {
      //.lean() para que devuelva en json y lo muestre handlebars
      const allProductsDB = await productsModel.paginate(filter, options);

      //-----allProductsDB trae el array de productos y la info de paginación. En allProductsDB.docs está el array de productos. Esto de crear un nuevo objeto llamado products que es igual a allProductsDB.docs se hace a cambio de .loan(), porque con paginate no sirve .lean() y hay que hacer algo para que handlebars funcione.---------------------------
      let oldProducts = allProductsDB.docs;

      let products = oldProducts.map((el) => {
        return {
          title: el.title,
          description: el.description,
          price: el.price,
          category: el.category,
          thumbnails: el.thumbnails,
          code: el.code,
          stock: el.stock,
          status: el.status,
        };
      });

      //-------------------------fin artilugio para que funcione handlebars--------------------

      const response = {
        status: "success",
        payload: allProductsDB.docs,
        totalPages: allProductsDB.totalPages,
        prevPage: allProductsDB.prevPage,
        nextPage: allProductsDB.nextPage,
        hasPrevPage: allProductsDB.hasPrevPage,
        hasNextPage: allProductsDB.hasNextPage,
        prevLink: allProductsDB.prevPage
          ? `https://localhost8080/api/products?page=${allProductsDB.prevPage}`
          : null,
        nextLink: allProductsDB.nextPage
          ? `https://localhost8080/api/products?page=${allProductsDB.nextPage}`
          : null,
      };
      console.log(response);

      return products;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getProductById(productoId) {
    if (!productoId) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const productIdDB = await productsModel.findById(productoId).lean();
      if (!productoId) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
      }
      return productIdDB;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addProduct(product) {
    if (!product) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteProduct(id) {
    if (!id) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const deletedProduct = await productsModel.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProduct(id, newProduct) {
    if (!id || !newProduct) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const updatedProduct = await productsModel.findByIdAndUpdate(
        id,
        {
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
          code: newProduct.code,
          stock: newProduct.stock,
        },
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async mockedProducts() {
    const products = [];
    for (let i = 0; i < 10; i++) {
      const product = new User({
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        stock: faker.random.numeric(),
        code: faker.random.alphaNumeric(5),
        thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
        status: faker.datatype.boolean(),
      });
      products.push(product);
      product.save();
    }

    return products;
  }
}
