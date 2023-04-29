import { userModel } from "../../mongodb/models/user.model.js";
import { hashPassword, comparePasswords } from "../../../utils.js";
import config from "../../../config.js";
// import UsersDBDTO from '../../DTO/usersDB.dto.js'
import UsersRepository from "../../repositories/users.repositories.js";
import { faker } from "@faker-js/faker";
import CustomError from "../../../utils/errors/CustomError.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../utils/errors/errorsEnum.js";

export default class UsersManager {
  async createUser(user) {
    //esta ruta ya no está en uso porque se usa la estrategia de passport??
    if (!user) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }

    const userFromDTO = new UsersRepository(user);

    const { email, password } = userFromDTO;
    try {
      const existeUsuario = await userModel.find({ email });

      if (existeUsuario.length !== 0) {
        const hashNewPassword = await hashPassword(password);
        let newUser = { ...userFromDTO, password: hashNewPassword };
        if (email === config.ADMIN_EMAIL) {
          newUser = { ...newUser, role: "admin" };
        }
        await userModel.create(newUser);
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async loginUser(user) {
    if (!user) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    const { username, password } = user;
    const usuario = await userModel.find({ email: username });
    if (!usuario) {
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
      });
    }
    if (usuario) {
      const isPassword = await comparePasswords(password, usuario[0].password);
      if (isPassword) {
        return usuario;
      }
    } else {
      //si no coinciden las contraseñas o si no encuentra el usuario:
      return null;
    }
  }

  // async getUsersData (user) {
  //   const usersData = await userModel.find({email: user.email})
  //   return usersData
  // }
}
