
import { userModel } from '../models/user.model.js'
import { hashPassword, comparePasswords } from '../../utils.js'


export default class UsersManager {

  async createUser(user) {
    const { email, password } = user
    try {
      const existeUsuario = await userModel.find({email})
      if (existeUsuario.length === 0) {
        const hashNewPassword = await hashPassword(password)
        const newUser = { ...user, password: hashNewPassword }
        await userModel.create(newUser)    
        return newUser
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async loginUser(user){
    const {email,password} = user
    const usuario = await userModel.find({email})
    if(usuario){
        const isPassword = await comparePasswords(password, usuario[0].password)
        if (isPassword) {
            return usuario
          }
    } else {
      return null
    }
  }
}