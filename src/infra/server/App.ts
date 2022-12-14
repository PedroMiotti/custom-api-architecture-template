import { Server, Application, BodyParser } from "./core/Modules";
import BaseController from "../../shared/base/BaseController";
import AppSettings from "../../shared/settings/AppSettings";
import HandlerErrorMiddleware from "../middleware/handleError";
//import AuthorizationMiddleware from '../middleware/authorization/jwt';
import config from "../config";
//import * as helmet from "helmet";
import logger from "../../shared/logger";
//import { MySqlConnection } from "@/infrastructure/database/typeorm/DatabaseConnection";

export default class App {
    public app: Application;

    constructor(controllers: BaseController[]) {
        this.setup();
        this.app = Server();
        this.app.set("trust proxy", true);
        this.loadMiddleware();
        this.loadControllers(controllers);
        this.loadHandleError();
    }

    public loadMiddleware(): void {
//        this.app.use(helmet());
        this.app.use(BodyParser());
//        this.app.use(AuthorizationMiddleware.handler);
    }

    private loadControllers(controllers: BaseController[]): void {
        controllers.forEach((controller) => {
            this.app.use(AppSettings.ServerRoot, controller.router);
        });
    }

    private loadHandleError(): void {
        this.app.use(HandlerErrorMiddleware.handler);
    }

    private setup(): void {
        AppSettings.init(config);
    }

    public listen(): void {
        this.app.listen(config.server.Port, () => {
            logger.info(`Server running on ${AppSettings.ServerHost}: ${AppSettings.ServerPort}${AppSettings.ServerRoot}`)
        });
    }

    private runServices(): void {
//        MySqlConnection.init();
        this.listen();
    }

    public start(): void {
        this.runServices();
    }
}
