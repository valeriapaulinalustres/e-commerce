import logger from "../utils/winston.js";

export const createLog = (req, res, next) => {
  logger.info(
    `Method: ${req.method} - URL: ${req.url} - date: ${Date().toString()}`
  );
  next();
};
