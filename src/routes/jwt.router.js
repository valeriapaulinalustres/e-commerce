import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from "../persistencia/DAO/mongoManagers/UsersManager.js";
import { jwtValidation } from "../middlewares/jwt.middlewares.js";
import logger from "../utils/winston.js";

const router = Router();
const userManager = new UsersManager();

// Este archivo se utilizó para una entrega pero no se usa en el proyecto final. Queda para recordar cómo se hace
// con cookies

// ------ruta para generar token ------
router.post("/login", async (req, res) => {
  //const {email,password} = req.body
  const user = await userManager.loginUser(req.body);
  if (user) {
    const token = generateToken(user);
    logger.info("token generado con éxito");
    return res.cookie("token", token, { httpOnly: true }).json({ token });
  }
  res.json({ message: "Usuario no existe" });
});

// ----- ruta para validar token -----
router.get("/login", jwtValidation, (req, res) => {
  logger.info("Token validado");
  res.send("Token validado");
});

// ----- ruta para devolver usuario si existe el token -------------
router.get("/current", (req, res) => {
  let token = req.cookies.token;
  let user = req.cookies.user.user;

  if (token) {
    res.json({ tokenFromCookie: token, userFromCookie: user });
  } else {
    logger.error("error, no hay token");
  }
});

//login con passport JWT
//   router.get('/loginJWTPassport', passport.authenticate('jwt',{session:false}), (req, res) => {
//     res.send('JWT PASSPORT')
//   })

export default router;
