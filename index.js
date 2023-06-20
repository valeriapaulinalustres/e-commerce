import express from "express";
import config from "./src/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views/views.router.js";
import chatRouter from "./src/routes/views/messages.router.js";
import usersRouter from "./src/routes/users.router.js";
import usersViewRouter from "./src/routes/views/usersView.router.js";
import jwtRouter from "./src/routes/jwt.router.js";
import loggerTestRouter from "./src/routes/loggerTest.router.js";
import { __dirname } from "./src/utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import "./src/persistencia/mongodb/dbConfig.js";
import mongoStore from "connect-mongo";
import MessageManager from "./src/persistencia/DAO/mongoManagers/MessageManager.js";
import passport from "passport";
import "./src/passport/passportStrategies.js";
import { errorMiddleware } from "./src/utils/errors/errorsMiddleware.js";
import { createLog } from "./src/middlewares/winston.middleware.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSetup } from "./src/swaggerSpecs.js";

const app = express();
const messageManager = new MessageManager();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//cookie parser (para guardar id de session)
app.use(cookieParser());
//logger
app.use(createLog);

// Session con Mongo
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl:
        "mongodb+srv://valeriapaulinalustres:Artemisa37@cluster0.knm2ak6.mongodb.net/ecommerce?retryWrites=true&w=majority",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// passport
//inicializar passport
app.use(passport.initialize());
// passport va a guardar la informacion de session
app.use(passport.session());

//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/realtimeproducts", viewsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/users", usersRouter);
app.use("/api/views", usersViewRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/loggerTest", loggerTestRouter);
//swagger documentation endpoint
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// archivos estaticos
//OJO QUE DETRÁS DE PUBLIC NO HAY BARRA, POR LO QUE DONDE SE NECESITE SEGUIR CON LA URL (EJEMPLO STYLE.CSS) HAY QUE PONERLE LA BARRA DELANTE
app.use(express.static(path.join(__dirname, "/public")));

//motores de plantilla
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(errorMiddleware); //el middleware de errores va al final de todo

const PORT = config.PORT || 8080;

const httpServer = app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

//websocket
const socketServer = new Server(httpServer);

const newProductsArray = [];

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });

  socket.on("newProduct", (newProduct) => {
    console.log(newProduct);
    newProductsArray.push(newProduct);
    socketServer.emit("newProductsArray", newProductsArray);
  });
});
//************chat*************** */

socketServer.on("connection", async (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });

  socket.emit("chat", await messageManager.getMessages()); //chat
  socket.on("update-chat", async (newMessage) => {
    //update-chat
    await messageManager.addMessage(newMessage);
    socketServer.sockets.emit("chat", await messageManager.getMessages());
  });
});
