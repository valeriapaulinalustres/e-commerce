import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  CLIENT_ID_GITHUB: process.env.CLIENT_ID_GITHUB,
  CLIENT_SECRET_GITHUB: process.env.CLIENT_SECRET_GITHUB,
  CLIENT_ID_GOOGLE: process.env.CLIENT_ID_GOOGLE,
  CLIENT_SECRET_GOOGLE: process.env.CLIENT_SECRET_GOOGLE,
  MONGOURL: process.env.MONGOURL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  GMAIL_USER: process.env.GMAIL_USER,
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_PORT: process.env.EMAIL_PORT,
};
