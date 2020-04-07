import * as express from 'express';
import { createStore } from '../../shared/store';

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    res.locals.store = createStore({});
    next();
};

export default addStore;
