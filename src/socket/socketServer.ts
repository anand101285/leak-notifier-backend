/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Server as HttpServer } from 'http';
import { Namespace, Socket, Server as SocketServer } from 'socket.io';
// import { AuthService } from '@services/auth';
import { globals } from '@config/globals';
import { logger } from '@config/logger';
import { SocketNamespace } from '@customTypes/index';
import { IUserDocument } from '@models/index';
import { AuthService } from '@services/auth';
import { CONNECT, DISCONNECT, ERROR } from './events';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
// type CallBack = (...args: Array<any>) => any;

export default class SocketIO {
    // eslint-disable-next-line no-use-before-define
    private static instance: SocketIO;
    public static io: SocketServer;
    public static httpServer: HttpServer;
    private static agentNamespace: Namespace;
    private static frontendNamespace: Namespace;

    /**
     * Constructor
     * @param {Server} httpServer Express Application
     */
    constructor(httpServer: HttpServer) {
        if (!SocketIO.instance) {
            SocketIO.httpServer = httpServer;
            SocketIO.io = new SocketServer(SocketIO.httpServer, {
                cors: {
                    origin: globals.CORS,
                    methods: ['GET', 'POST']
                }
            });
            SocketIO.agentNamespace = SocketIO.io.of(SocketNamespace.MinesAgent);
            SocketIO.frontendNamespace = SocketIO.io.of(SocketNamespace.Frontend);
        }
        return SocketIO.instance;
    }

    /**
     * getInstance
     * @param {Server} httpServer Express Application
     * @returns {SocketIO} instance of SocketIO
     */
    public static getInstance(httpServer: HttpServer): SocketIO {
        if (!SocketIO.instance) {
            SocketIO.instance = new SocketIO(httpServer);
        }

        return SocketIO.instance;
    }

    /**
     * Start server listener
     * @returns {SocketServer}
     */
    public static getIo(): SocketServer {
        return this.io;
    }

    /**
     * Start server listener
     * @returns {void}
     */
    public connect(): void {
        try {
            SocketIO.io
                .of(SocketNamespace.Frontend)
                .use((socket, next) => {
                    this.authenticate(socket, next);
                    next();
                })
                .on(CONNECT, this.handleFrontendConnection);
        } catch (err) {
            logger.error(err);
        }
    }

    /**
     * Start server listener
     * @param {Socket} socket Socket to which user connects
     * @param {unknown} next Next
     * @returns {void}
     */
    public authenticate(
        socket: Socket,
        // eslint-disable-next-line no-unused-vars
        next: (err?: Error) => void
    ): unknown {
        try {
            const authUser = new AuthService('user');
            if (socket.handshake.query.token) {
                const token = authUser.decryptToken(socket.handshake.query.token as string);
                const decoded = authUser.verifyToken(token);
                (socket.data as Record<string, unknown>).user = decoded.user as Record<
                    string,
                    unknown
                >;

                return next();
            }

            return next(new Error('Authentication error'));
        } catch (err) {
            return next(err as Error);
        }
    }

    /**
     * Handle the connection from frontend
     *
     * @param {Socket} socket socket to handle the frontend connection
     */
    public handleFrontendConnection = (socket: Socket): void => {
        try {
            logger.info(`Connected frontend socketid: ${socket.id}`);

            socket.on(DISCONNECT, () => {
                logger.info(`Disconnected frontend socket id: ${socket.id}`);
                clearInterval(socket.data.intervalId as NodeJS.Timer);
                socket.disconnect();
            });

            socket.on(ERROR, (err) => {
                logger.error(err);
            });
        } catch (err) {
            logger.error(err);
        }
    };

    /**
     * Send Data to User
     * @param {string} event Socket Event type
     * @param {string} userId User
     * @param {SocketNamespace} namespace namespace
     * @param {number} timeout timeout
     * @param {Array<unknown>} data Data to be sent
     * @returns {void}
     */
    public static socketEmit(
        event: string,
        userId: string,
        namespace: SocketNamespace,
        timeout: number,
        ...data: Array<unknown>
    ): void {
        const sockets = SocketIO.socketForUser(namespace, userId);
        sockets.forEach((socket) => {
            socket.timeout(timeout).emit(event, ...data);
        });
    }

    /**
     * search socket connected for namespace and user id
     *
     * @param {SocketNamespace} namespace - socket namespace to search
     * @param {string} userId - user id to search
     * @returns {Array<Socket>} returns socket
     */
    public static socketForUser(namespace: SocketNamespace, userId: string): Array<Socket> {
        const sockets: Array<Socket> = [];
        SocketIO.io.of(namespace).sockets.forEach((entry: Socket) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if ((entry.data.user as IUserDocument)?.id === userId) {
                sockets.push(entry);
            }
        });
        return sockets;
    }

    /**
     * Emit event to frontend
     *
     * @param {string} event event Name to emit socket to
     * @param {SocketNamespace} namespace namespace name to send event to
     * @param {string} userId Id of user to send data  to
     * @param {Array<unknown>} data Data to be sent
     * @returns {void}
     */
    public static socketFrontendEmit(
        event: string,
        namespace: SocketNamespace,
        userId: string,
        ...data: Array<unknown>
    ): void {
        const sockets = SocketIO.socketForUser(namespace, userId);
        sockets.forEach((socket) => {
            socket.emit(event, ...data);
        });
    }
}
