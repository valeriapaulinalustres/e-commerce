import { Router } from "express";
import passport from "passport";
import {
  getUsersDataController,
  forgotPasswordController,
  createNewPasswordController,
  changeRolController,
  getUserDataFromMailController,
  addCartToUserController,
  uploadFilesController,
  loginSuccessController,
  loginController,
  logoutController,
  getUsersController,
  deleteUsersController,
  deleteUserController,
  changeRolByAdminController,
} from "../controllers/users.controller.js";
import logger from "../utils/winston.js";
import { upload } from "../middlewares/multer.js";
import { FRONT_URL } from "../utils/mainRoute.js";
import '../passport/passportStrategies.js'

const router = Router();

router.get("/", getUsersController);

// --- Registro con Passport ---
router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/api/users/registro/error",
    successRedirect: "/api/users/registro/success",
    passReqToCallback: true,
  })
);

router.get("/registro/success", (req, res) => {
  res.json({ success: true, message: "Usuario registrado con éxito" });
});

router.get("/registro/error", (req, res) => {
  res.json({ success: false, message: "Registro incorrecto" });
});

// --- Login con Passport ---
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/users/login/error",
    successRedirect: "/api/users/login/success",
    passReqToCallback: true,
    session: true,
  }),
  loginController
);

router.get("/login/success", loginSuccessController);

router.get("/login/error", async (req, res) => {
  res.json({ existUser: false, message: "Usuario o contraseña incorrectos" });
});

// --- Logout ---
router.post("/logout", logoutController);

// --- Registro con Github ---
router.get(
  "/registroGithub",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get("/github", passport.authenticate("github", 
{ scope: ["user:email"], session: false }
),
(req, res) => {
  //   req.session.email = req.user.email;
  //  res.redirect(FRONT_URL);
  

   console.log('del userRouter', req.user)
  // res.status(200).json(req.user)

  res.redirect("/api/users/login/success", req.user);


    // const user = JSON.stringify(req.user)
    // res.status(200).send(`
    // <!DOCTYPE html>
    // <html lang="en">
    // <body><h1>Probando...</h1></body>
    // <script>
    // window.opener.postMessage(${user}, "https://ll-ecommerce-p4ro.vercel.app");
    // </script>
    // </html>
    // `)
  }
);

// --- Registro con Google ---
router.get(
  "/registroGoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google", passport.authenticate("google"), function (req, res) {
  req.session.email = req.user.email;
  // Successful authentication, redirect home.
  res.redirect(FRONT_URL);
});

// --- Trae datos del usuario ---
router.get("/current", getUsersDataController);

router.post("/current", getUserDataFromMailController);

//--- Recupera contraseña ---
router.post("/forgot-password", forgotPasswordController);

//--- Crea nueva contraseña--
router.post("/create-new-password/:userId/:token", createNewPasswordController);

// --- Cambia el rol del usuario
router.put("/premium/:uid", changeRolController);

// --- Agrega el id del carrito a su usuario ---
router.put("/add-cart-to-user", addCartToUserController);

// --- Carga documentos ---
const cpUpload = upload.fields([
  { name: "profile", maxCount: 1 },
  { name: "product", maxCount: 3 },
  { name: "document", maxCount: 3 },
]);
router.post("/:uid/documents", cpUpload, uploadFilesController);

// --- Elimina usuarios sin conexión de los últimos 2 días ---
router.delete("/", deleteUsersController);

// --- Elimina un usuario ---
router.delete("/delete-user", deleteUserController);

// --- Cambia el rol de un usuario ---
router.put("/change-rol", changeRolByAdminController);

export default router;

// *** Registro sin passport *** (Lo dejo para saber cómo realizarlo)

// router.post('/registro', async (req, res) => {
//    if (req.body.password === req.body.repeatPassword) {
//     const newUser = await usersManager.createUser(req.body)
//     if (newUser) {
//       res.redirect('/api/views/login')
//     } else {
//         let mensaje = 'Este usuario ya existe. Vaya a login por favor'
//         res.render('errorLogin', {mensaje})
//     }
//    } else {
//     let mensaje = 'No coinciden las contraseñas'
//     res.render('errorRegistro', {mensaje})
//    }

//   })

// *** Login sin Passport *** (Lo dejo para saber cómo hacerlo)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body
//   const user = await usersManager.loginUser(req.body)
//   if (user) {
//       req.session.name = user[0].first_name
//     req.session.email = email
//     req.session.password = password
//       // if(email === 'adminCoder@mail.com' && password === '12345'){
//   //   req.session.isAdmin = true
//   // } else {
//   //   req.session.isAdmin = false
//   // }
//     res.redirect('/api/products')
//   } else {
//       let mensaje = 'Usuario o contraseña inválidos'
//     res.render('errorLogin',{mensaje})
//   }
// })
