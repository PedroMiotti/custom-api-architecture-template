import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { Result } from '../../../../shared/result';

export const validate =
    (schema: AnyZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            const result = new Result();
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                return next();
            } catch (error: any) {
                if (error instanceof ZodError) {
                    result.setError(
                        error.errors.map((e) => e.message),
                        400,
                    );
                    res.status(+result.statusCode).send(result);
                }
            }
        };
