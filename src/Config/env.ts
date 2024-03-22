import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const secretKeys = {
    SERVER_PORT: process.env.SERVER_PORT || 3200,
    APP_ENV: process.env.APP_ENV || 'dev' as | 'dev' | 'stage' | 'preprod' | 'master' | 'local',
    MONGO_HOST: process.env.MONGO_HOST || '127.0.0.1' as string,
    MONGO_PORT: process.env.MONGO_PORT || 27017 as number,
    MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME || 'movie-lobby' as string,
    JWT_KEY: process.env.JWT_KEY as string,
    JWT_EXPIRES_IN: '4h' as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: process.env.REDIS_PORT as string,
    REDIS_TTL: process.env.REDIS_TTL as string,
    REDIS_PREFIX: process.env.REDIS_PREFIX as string,
    CRYPTO_SECRET_KEY : process.env.CRYPTO_SECRET_KEY as string
};