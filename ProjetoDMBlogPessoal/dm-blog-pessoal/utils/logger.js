// utils/logger.js
import winston from "winston";

const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "errors.log" }), // Logs de erros serão salvos neste arquivo
  ],
});

export default logger;
