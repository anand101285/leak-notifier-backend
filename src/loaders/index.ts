import ExpressLoader from './express';
import express from 'express';
import { Server } from 'http';
import { logger } from '@config/logger';
import SocketServer from '@socket/socketServer';
import mongooseLoader from './mongoose';

export default async (app: express.Application, httpServer: Server): Promise<ExpressLoader> => {
    await mongooseLoader();
    logger.info('[+] MongoDB Initialized!');
    const expressObj = new ExpressLoader(app, httpServer);
    logger.info('[+] Express Initialized!');

    /**
     * Initialize socket
     */
    const socketServer = SocketServer.getInstance(httpServer);
    socketServer.connect();
    logger.info('[+] Socket Initialized');

    return expressObj;
};
