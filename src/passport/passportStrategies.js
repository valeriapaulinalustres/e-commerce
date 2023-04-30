import passport from "passport";
import { userModel } from "../../src/persistencia/mongodb/models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword, comparePasswords } from "../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";
import UsersDBDTO from "../persistencia/DTO/usersDB.dto.js";
import config from "../config.js";

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
        };

        const newuserBD = await userModel.create(newUser);
        done(null, newuserBD);
      } catch (error) {
        done(error);
      }
    }
  )
);

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
            console.log("Login realizado con éxito");
            req.session.fullName = user.full_name;
            req.session.email = user.email;
            req.session.password = user.password;
            req.session.role = user.role;
            req.user = user;
            return done(null, user);
          } else {
            console.log("contraseñas no coinciden");
            return done(null, false);
          }
        } else {
          console.log("el usuario no existe");
          return done(null, false); //el usuario no existe
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

//------------ github strategy -------------------
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.672fec06309dff3d",
      clientSecret: "3ba2e70390df01fa7eb49cef3fbbe434b07ffefc",
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
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
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

/*
App ID: 305163
Client Secret: 16007547c83e7a643e09298a9c201c00df61f7a1
Client ID: Iv1.ba8d845bcb2956e3
*/
