import logger from "../utils/winston.js";

export const verificarUsuarioPremiumOAdmin = (req, res, next) => {
  const user = req.user || req.body.owner;
  if (user?.role === "premium" || user?.role === "admin") {
    next();
  } else {
    logger.error(
      "Debés tener rol premium o admin para realizar esta operación"
    );
    res
      .json({ message: "No estas autorizado para realizar esta operacion" })
      .status(401);
  }
};

export const verificarUsuarioPremium = (req, res, next) => {
  const user = req.user || req.body.user;
  if (user?.role === "premium") {
    next();
  } else {
    logger.error("Debés tener rol premium para realizar esta operación");
    res
      .json({ message: "No estas autorizado para realizar esta operacion" })
      .status(401);
  }
};

export const verificarUsuarioAdmin = (req, res, next) => {
  const user = req.user || req.body.user;
  if (user?.role === "admin") {
    next();
  } else {
    logger.error("Debés tener rol admin para realizar esta operación");
    res
      .json({ message: "No estas autorizado para realizar esta operacion" })
      .status(401);
  }
};

export const verificarUsuarioClient = (req, res, next) => {
  const user = req.user || req.body.user;
  if (user?.role === "user") {
    next();
  } else {
    logger.error("Debés tener rol client para realizar esta operación");
    res
      .json({ message: "No estas autorizado para realizar esta operacion" })
      .status(401);
  }
};
