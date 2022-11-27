export default class AppSettings {
    static ServerRoot: string;
    static ServerPort: string;
    static ServerHost: number;
    static ServerOrigins: string;

    static EncryptionSaltRounds: string;
    static JWTEncryptionKey: string;
    static JWTExpirationTime: number;

    static PGHost: string;
    static PGUser: string;
    static PGPassword: string;
    static PGDatabaseName: string;

    static DefaultUserPasswd: string;

    static init(config: { [key: string]: any }): void {
        this.ServerRoot = config.server.Root;
        this.ServerHost = config.server.Host;
        this.ServerPort = config.server.Port;
        this.ServerOrigins = config.server.Origins;

        this.EncryptionSaltRounds = config.params.security.EncryptionSaltRounds;
        this.JWTEncryptionKey = config.params.security.jwt.SecretKey;
        this.JWTExpirationTime = config.params.security.jwt.ExpireInSeconds;

        this.PGHost = config.params.postgres.host;
        this.PGUser = config.params.postgres.user;
        this.PGPassword = config.params.postgres.password;
        this.PGDatabaseName = config.params.postgres.databaseName;

        this.DefaultUserPasswd = config.params.security.DefaultUserPasswd;

    }
}