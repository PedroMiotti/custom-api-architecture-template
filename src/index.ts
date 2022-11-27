import App from "./infra/server/App";
import BaseController from "./shared/base/BaseController";

const controllers: BaseController[] = [];

const app = new App(controllers);

app.start();
