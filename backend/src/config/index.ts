import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    POSTGRES: {
        CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING
    }
}
const auth = {
    secret: String(process.env.SECRET),
    expires: '1h',
}

export { config, auth };