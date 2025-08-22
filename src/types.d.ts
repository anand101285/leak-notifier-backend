/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

/**
 * d.ts files are treated as an ambient module declarations
 * only if they don't have any imports. If you provide an
 * import line, it's now treated as a normal module file,
 * not the global one, so augmenting modules definitions
 * doesn't work.
 */

declare namespace Express {
    interface Request {
        // current user details
        user: {
            /**
             * this id will be always referring towards signed in user (even in mssp switching context
             * switching to differet account wont effect this id.)
             */
            id: string;
            role: string;
        };
        agent: {
            createdBy: string;
            _id: string;
            apiKey: string;
            socketId: string;
        };
        body: Record<string, unknown>;
    }
}

// declare interface ISocket extends import('socket.io').Socket {
//   data: {
//     user: {
//       id: string;
//       role: string;
//       api_key: string;
//     };
//   };
// }
