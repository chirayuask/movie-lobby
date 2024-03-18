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
    JWT_EXPIRES_IN: '4h' as string
};