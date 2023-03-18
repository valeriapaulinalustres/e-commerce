import passport from "passport";
import { userModel } from "../../src/dao/models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword, comparePasswords } from "../utils.js";
//import { Strategy as GithubStrategy } from 'passport-github2'

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (user) {
        return done(null, false);
      }
      const hashNewPassword = await hashPassword(password);
      const newUser = { ...req.body, password: hashNewPassword };
      const newuserBD = await userModel.create(newUser);
      done(null, newuserBD);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (user) {
        console.log(user);
        const isPassword = await comparePasswords(password, user.password);

        if (isPassword) {
          console.log("pasan contraseñas");
          req.session.name = user.first_name;
          req.session.email = user.email;
          req.session.password = user.password;
          //   if(email === 'adminCoder@mail.com' && password === '12345'){
          //         req.session.isAdmin = true
          //       } else {
          //         req.session.isAdmin = false
          //       }

          return    done(null, user);
        } else {
          //si no coinciden las contraseñas o si no encuentra el usuario:
          console.log("contraseñas no coinciden");
          return done(null, false);
        }
      }
    }
  )
);

// github strategy
// passport.use(
//   'github',
//   new GithubStrategy(
//     {
//       clientID: 'Iv1.ba8d845bcb2956e3',
//       clientSecret: '16007547c83e7a643e09298a9c201c00df61f7a1',
//       callbackURL: 'http://localhost:8080/users/github',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const user = await userModel.findOne({ email: profile._json.email })
//       if (!user) {
//         const newUser = {
//           first_name: profile._json.name.split(' ')[0],
//           last_name: profile._json.name.split(' ')[1] || ' ',
//           email: profile._json.email,
//           password: ' ',
//         }
//         const userDB = await userModel.create(newUser)
//         done(null, userDB)
//       } else {
//         done(null, user)
//       }
//     }
//   )
// )

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
