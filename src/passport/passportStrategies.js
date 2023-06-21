import passport from "passport";
import { userModel } from "../../src/persistencia/mongodb/models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword, comparePasswords, generateToken } from "../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";
import UsersDBDTO from "../persistencia/DTO/usersDB.dto.js";
import config from "../config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { loginService } from "../services/users.services.js";
import logger from "../utils/winston.js";

// *** Passport Registro ***
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        if (!first_name || !last_name || !age) {
          return done(null, false); //null es porque funcionó bien pero false porque no se pudo crear el usuario
        }

        const user = await userModel.findOne({ email });
        if (user) {
          return done(null, false);
        }

        let userRole;
        if (email == config.ADMIN_EMAIL) {
          userRole = "admin";
        } else {
          userRole = "user";
        }

        const hashNewPassword = await hashPassword(password);
        const userFromDto = new UsersDBDTO(req.body);

        const newUser = {
          //todo lo que trae del form de registro más lo que yo le agrego:
          ...userFromDto,
          password: hashNewPassword,
          // cartId: ' ',
          role: userRole,
          lastConnection: "0", //sirve para poder borrar los que se registraron y nunca se logearon, ruta api/users/ método delete
        };

        const newuserBD = await userModel.create(newUser);
        done(null, newuserBD);
      } catch (error) {
        done(error);
      }
    }
  )
);

// *** Passport Login ***
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email", //le aviso que el username es el realidad email
      passwordField: "password", //este es redundante
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (user) {
          const isPassword = await comparePasswords(password, user.password);

          if (isPassword) {
            logger.info("Login realizado con éxito");
            req.user = user; 
            req.session.user = user;
            req.session.save();
            //actualiza fecha y hora de login
            const time = new Date();
            const response = await loginService(req.user, time);

            return done(null, response); //el primer null se refiere al error, lo segundo a si encontró usuario
          } else {
            logger.error("contraseñas no coinciden");
            return done(null, false);
          }
        } else {
          logger.error("el usuario no existe");
          return done(null, false); //el usuario no existe
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

// *** Github Strategy ***
passport.use("github",
  new GithubStrategy(
    {
      clientID: "Iv1.672fec06309dff3d", // config.CLIENT_ID_GITHUB, con el config no funciona
      clientSecret: "3ba2e70390df01fa7eb49cef3fbbe434b07ffefc", //config.CLIENT_SECRET_GITHUB, con el config no funciona
      callbackURL: "https://e-commerce-production-8113.up.railway.app/api/users/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await userModel.findOne({ email: profile._json.email });
      if (!user) {
        console.log(profile);
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: " ",
          age: 0,
          cartId: 0,
        };
        const userDB = await userModel.create(newUser);
        
        done(null, userDB);
      } else {
        console.log('del passport', user)
        done(null, user);
      }
      // console.log('del passport profile', profile)
      // done(null,profile)
    }
  
  )
);

// async function (accessToken, refreshToken, profile, done) {
//   const user = await userModel.findOne({ email: profile._json.email });
//   if (!user) {
//     console.log(profile);
//     const newUser = {
//       first_name: profile._json.name.split(" ")[0],
//       last_name: profile._json.name.split(" ")[1] || " ",
//       email: profile._json.email,
//       password: " ",
//       age: 0,
//       cartId: 0,
//     };
//     const userDB = await userModel.create(newUser);
//    return  done(null, userDB);
//   } else {
//    return  done(null, user);
//   }
// }

// *** Google Strategy ***
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID:
        "569130855734-ak7t8k24icf4qdj27ecmphvhhb9carm2.apps.googleusercontent.com", //config.CLIENT_ID_GOOGLE,
      clientSecret: "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", //config.CLIENT_SECRET_GOOGLE,
      callbackURL: "http://localhost:8080/api/users/google",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await userModel.findOne({ email: profile._json.email });
      if (!user) {
        console.log(profile);
        const newUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name || " ",
          email: profile._json.email,
          password: " ",
          age: 0,
        };
        const userDB = await userModel.create(newUser);
        done(null, userDB);
      } else {
        return done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  //serialize sirve para guardar la info de usuario en una cookie
  console.log('desde el serialize user',user);
  done(null, user._id); //esto sirve para que cada vez que se ejecute el done, se guarde el user id en una cookie.Se recupera con req['user']
});

passport.deserializeUser(async (id, done) => {
  //recibe el id de la cookie y la compara en mongo atlas
  const user = await userModel.findById(id);
  done(null, user); //al encontrar el usuario con esa id lo pasa a la próxima etapa
});

/*
Github
App ID: 305163
Client Secret: 16007547c83e7a643e09298a9c201c00df61f7a1
Client ID: Iv1.ba8d845bcb2956e3
*/

/*
Google
key=API_KEY = AIzaSyD2MZhMis40aJpIWN0fcTsGOI88dZcjUZA
clientID: 569130855734-ak7t8k24icf4qdj27ecmphvhhb9carm2.apps.googleusercontent.com
clientSecret: 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
*/
