import logger from "../utils/winston.js";

export const loggerTestController = (req, res) => {
  try {
    logger.fatal("fatal");
    logger.error("error");
    logger.warn("warn");
    logger.info("info");
    logger.http("http");
    logger.debug("debug");

    res.json({ message: "Test realizado" });
  } catch (error) {
    logger.error(error);
  }
};
