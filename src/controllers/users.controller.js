import {
  createUserService,
  loginUserService,
  getUsersDataService,
  forgotPasswordService,
  createNewPasswordServices,
  changeRolServices,
  getUserDataFromMailService,
  addCartToUserService,
  uploadFilesService,
  logoutService,
  getUsersService,
  deleteUsersService
} from "../services/users.services.js";

import { generateToken } from "../utils.js";
import logger from "../utils/winston.js";
import UsersManager from "../persistencia/DAO/mongoManagers/UsersManager.js";
const usersManager = new UsersManager();


export const getUsersController = async (req,res) =>{
  try {
    const response = await getUsersService()
    res.json({message: 'Users got successfully', users: response})
  } catch (error) {
    logger.error('Error del controller', error)
  }
}

export const getUsersDataController = async (req, res) => {
  try {
    
    const user = req.user;
    console.log('entra', user)
    console.log("mail de usuario", user.email);
    //const userData = await getUsersDataService(user)
    res.json({ usersMail: user.email, userFullname: user.full_name, user, existUser: true });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const getUserDataFromMailController = async (req, res) => {
  const email = req.body
  try {
    const response = await getUserDataFromMailService(email)
    res.json({user: response})
  } catch (error) {
    logger.error('Error del controller', error)
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const mail = req.body.email;
    console.log("mail", mail);
    if (req.body.email == "") {
      res.status(400).send({ message: "Se requiere un mail" });
    } else {
      const user = await forgotPasswordService(mail);
      res.send({ mensaje: "email enviado con éxito", user });
    }
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const createNewPasswordController = async (req, res) => {
  console.log(req.body.password);
  console.log(req.params.userId, req.params.token);
  let regExPassword =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])([A-Za-z\d@$!%*?&#]){8,16}&/;
  //     if (!regExPassword.test(req.body.password))
  //   {res.send({
  //     message: 'The password must contain at least: between 8 and 16 characters, 1 number, 1 lowercase letter, 1 capital letter and 1 special character.'
  //   })
  // return
  // }
  try {
    const user = await createNewPasswordServices(
      req.body.password,
      req.params.userId,
      req.params.token
    );
    console.log(user);
    res.json({ message: 'Password update successfully', user });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const changeRolController = async (req,res) => {
  const userId = req.params.uid
try {
  const response = await changeRolServices(userId)
  console.log(response)
  if (response) {
    res.json({ message: 'Role updated successfully', user: response });
  } else {
res.json({message: 'Could not change rol. User must upload documentation.'})
  }
 
} catch (error) {
  logger.error('Error del controller', error)
}

  
}


export const addCartToUserController = async (req,res) => {
  const userId = req.body.uid
  const cartId = req.body.cid
try {
  const user = await addCartToUserService(userId, cartId)
  console.log(user)
  res.json({ message: 'User update successfully' });
} catch (error) {
  logger.error('Error del controller', error)
}

  
}

export const uploadFilesController = async (req,res) => {
  const userId = req.params.uid
  const documents = req.files //en req.files se guarda lo subido por multer

  let documentsUploaded = []

  if(documents?.profile) {documents.profile.forEach(el=>{
    documentsUploaded.push({name: el.filename, reference: el.path})
  })}
  
if(documents?.product)   documents.product.forEach(el=>{
  documentsUploaded.push({name: el.filename, reference: el.path})
})

if(documents?.documents) { documents.document.forEach(el=>{
  documentsUploaded.push({name: el.filename, reference: el.path})
})}
 

 // console.log('uploaded', documentsUploaded)


try {
  const user = await uploadFilesService(userId, documentsUploaded)
  console.log(user)
  res.json({ message: 'Documents uploaded successfully' });
} catch (error) {
  logger.error('Error del controller', error)
}}


export const loginSuccessController = async (req, res) =>{
  console.log("aca", req.user); //funciona

try {
      //----- Autenticación de usuarios ---
      const token = generateToken(req.user);
      logger.info("token generado con éxito", token); //funciona
      console.log("token generado con éxito", token); //aparece la cookie en navegador

      res
        .cookie("token", token, { httpOnly: true })
        .json({
          existUser: true,
          message: "Login realizado con éxito",
          user: req.user,
          token,
        
        })
        .send(req.session.sessionID);
      // res.json({existUser: true, message:'Login realizado con éxito', user:req.user})
} catch (error) {
  logger.error('Error del controller', error)
}
}

export const loginController = async (req,res)=>{

try {
    console.log("aqui", req.user); //no funciona
  res
  .json({responseTime: response})
    .cookie("cookie-prueba", "vale")
    .redirect("/api/users/login/success", req.user) //cookie vale no funciona
 
// } //le manda a la ruta success el usuario
} catch (error) {
  logger.error('Error del controller', error)
}
}


//Para probar esta ruta en postman hacer primero el login!! Anda bien!!
export const logoutController = async (req, res) =>{
    req.session.destroy(async (error) => {
      if (error) {
        logger.error('Error del controller', error)
        res.json({ success: false, message: "Error en el logout" });
      } else {
        //res.redirect('api/views/login')
        const time = new Date();
        const response = await logoutService(req.user, time)
        res.json({ success: true, message: `Logout realizado con éxito el ${response}` });
      }
    });
  
}



export const deleteUsersController = async (req, res) =>{
  try {
    const response = await deleteUsersService()
    res.json({message: response})
  } catch (error) {
    logger.error('Error del controller', error)
  }
}


