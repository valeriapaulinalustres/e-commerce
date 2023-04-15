import dotenv from 'dotenv'
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGOURL: process.env.MONGOURL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
}