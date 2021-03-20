import {Response, Request, NextFunction} from "express";
import { ResponseSuccess, ResponseError } from "../models/JSONResponseModel";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(ResponseSuccess.EMPTY_MODEL);
    } catch (e) {
        console.log(e);
        return res.status(500).json(new ResponseError(e, 500, false));
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(ResponseSuccess.EMPTY_MODEL);
};

