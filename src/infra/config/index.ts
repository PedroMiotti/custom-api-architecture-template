import * as dotenv from "dotenv";

if (!process?.env?.NODE_ENV) {
    dotenv.config();
}

const dev = "development";

export default {
    Environment: process.env.NODE_ENV || dev,
    server: {
        Root: process.env.SERVER_ROOT || "/api",
        Host: process.env.SERVER_HOST || "localhost",
        Port: process.env.SERVER_PORT || 3005,
        Origins:
        process.env.ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002",
    },
    params: {
        envs: {
            Dev: dev,
            Test: "testing",
            Production: "production",
        },
        security: {
            jwt: {
                SecretKey: process.env.JWT_SECRET_KEY,
                ExpireInSeconds: process.env.JWT_EXPIRE_TIME,
            },
            EncryptionSaltRounds: process.env.ENCRYPTION_SALT_ROUNDS,
            DefaultUserPasswd: process.env.DEFAULT_USER_PASSWD,
        },
        postgres: {
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            databaseName: process.env.PG_DATABASE_NAME
        }
    },
};
