import { Response } from 'express';
import { IResult } from '../result';
import { Router, RouterType } from "../../infra/server/core/Server";

export default class BaseController {
    router: RouterType;

    constructor() {
        this.router = Router();
    }

    handleResult(res: Response, result: IResult<any>): void {
        if (result.success) {
            res
            .status(+result.statusCode)
            .json(
                    result.message ? result.toResultDto() : result.toResultDto().data,
                    );
        } else {
            res.status(+result.statusCode).json(result.toResultDto());
        }
    }
}
