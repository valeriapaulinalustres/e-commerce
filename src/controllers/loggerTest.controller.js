import logger from "../utils/winston.js";

export const loggerTestController = (req, res) => {

    logger.fatal("fatal");
    logger.error("error");
    logger.warn("warn");
    logger.info("info");
    logger.http("http");
    logger.debug("debug");

 
};
