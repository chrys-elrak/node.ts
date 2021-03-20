import { ResponseError } from './../models/JSONResponseModel';
import { Router, Response, Request, NextFunction } from 'express';
import { login, register } from '../controllers/authenticationController';
import { UserModel } from '../models/UserModel';
import { addCollection, getCollections, getSingleCollection, removeCollection, updateCollection } from "../services/DBService";
import {validate} from "../middlewares/validateForm";

const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/users')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: UserModel[] = await getCollections('users');
            return res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    })
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = await addCollection('users', req.body);
            return res.status(200).json(userId);
        } catch (e) {
            next(e);
        }
    });

router.route('/users/:id')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: UserModel = await getSingleCollection('users', req.params.id);
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    })
    .delete(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const removed = await removeCollection('users', req.params.id);
            if (!removed) {
                return res.status(400).json(new ResponseError(`Can not remove document. Maybe this document doesn't exist.`, 400, false));
            }
            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    })
    .put(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = await updateCollection('users', req.params.id, req.body);
            return res.status(200).send(updated);
        } catch (e) {
            next(e);
        }
    }) ;

export default router;