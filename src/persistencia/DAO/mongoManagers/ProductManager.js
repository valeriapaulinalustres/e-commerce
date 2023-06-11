import CustomError from "../../../utils/errors/CustomError.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../utils/errors/errorsEnum.js";
import logger from "../../../utils/winston.js";
import { productsModel } from "../../mongodb/models/products.model.js";
import { faker } from "@faker-js/faker";

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

      if (!allProductsDB) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        logger.info("No hay productos en la base de datos");
      }
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
          id: el._id
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

      logger.info("Productos encontrados con éxito"); //(JSON.stringify(response))

      return { message: "Productos encontrados", products: products };
    } catch (error) {
      logger.error("Error desde el manager", error);
      return error;
    }
  }

  async getProductById(productoId) {
    try {
      if (productoId.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
          cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
          message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
        });
        return productoId;
      }

      const productIdDB = await productsModel.findById(productoId).lean();
      if (!productIdDB) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        logger.warn("No existe el producto en la base de datos");
      }
      return { message: "Producto encontrado", product: productIdDB };
    } catch (error) {
      logger.error("Error desde el manager", error);
      return error;
    }
  }

  async addProduct(product, owner) {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock ||
        !product.status ||
        !product.category ||
        !product.thumbnails
      ) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
          cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
          message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
        });
        logger.warn("Datos del producto incompletos");
        return;
      }
      let alreadyExists = await productsModel.find({ code: product.code });
      if (alreadyExists.length) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE,
        });
        logger.warn("El producto a crear ya existe en la base de datos");
        return alreadyExists;
      }

      product.owner = owner.email;

      let newProduct = await productsModel.create(product);

      logger.info("Producto creado con éxito");
      return { message: "Producto creado con éxito", product: newProduct };
    } catch (error) {
      logger.error("Error desde el manager", error);
      return error;
    }
  }

  async deleteProduct(id, owner) {
    console.log(owner)
    try {
      if (id.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
          cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
          message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
        });
        return;
      }

      let product = await productsModel.find({ _id: id });

      if (owner.role === "premium") {
        if (product[0].owner !== owner.email) {
          CustomError.createCustomError({
            name: ErrorsName.USER_DATA_NOT_ALLOWED,
            cause: ErrorsCause.USER_DATA_NOT_ALLOWED,
            message: ErrorsMessage.USER_DATA_NOT_ALLOWED,
          });
          return;
        }
      }

      const deletedProduct = await productsModel.findByIdAndDelete(id);
      if (deletedProduct === null) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        logger.warn("Producto no encontrado en la base de datos");
        return;
      }

      logger.info("Producto eliminado con éxito");
      return { message: "Producto eliminado con éxito", deletedProduct, status: 'success' };
    } catch (error) {
      logger.error("Error desde el manager", error);
      return error;
    }
  }

  async updateProduct(id, newProduct, owner) {
   console.log('desde el manager', 'id',id, 'pr', newProduct, 'o', owner)

// let owner = own.owner
// let newProduct = product.updatedProduct

    try {
      if (id.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
          cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
          message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
        });
        return;
      }

      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.status ||
        !newProduct.category 
      ) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
          cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
          message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
        });
        logger.warn("Faltan datos del producto");
        return;
      }

      let product = await productsModel.find({ _id: id });
console.log(product) //array, lo trae bien
//console.log('owner', owner.role)

      if (owner.role === "premium") {
        if (product[0].owner !== owner.email) {
          CustomError.createCustomError({
            name: ErrorsName.USER_DATA_NOT_ALLOWED,
            cause: ErrorsCause.USER_DATA_NOT_ALLOWED,
            message: ErrorsMessage.USER_DATA_NOT_ALLOWED,
          });
          return;
        }
      }



      const updatedProduct = await productsModel.findByIdAndUpdate(
        id,
        {
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
          code: newProduct.code,
          stock: newProduct.stock,
          status: newProduct.status,
          category: newProduct.category,
        },
        { new: true }
      );
      logger.info("Producto actualizado con éxito");
      console.log(updatedProduct)
      return { message: "Producto actualizado con éxito", updatedProduct, status: 'success' };
    } catch (error) {
      logger.error("Error desde el manager", error);
      return error;
    }
  }

  async mockedProducts() {
    try {
      const products = [];
      for (let i = 0; i < 4; i++) {
        const product = await productsModel.create({
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
        // product.save();
      }
      logger.info("Productos falsos creados con éxito");
      return { message: "Productos creados con éxito", products };
    } catch (error) {
      logger.error("Error desde el manager", error);
      return error;
    }
  }
}
