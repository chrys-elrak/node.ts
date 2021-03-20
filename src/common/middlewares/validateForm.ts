import {NextFunction, Request, Response} from "express";
import * as Joi from "joiful";

export function validate<T>(schema: T, value: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validate = await Joi.validate(schema, value);
        if (!validate.error) {
            req.body.value = validate.value;
            next(null);
        } else {
            return res.status(400).json(validate.error);
        }
    }
}