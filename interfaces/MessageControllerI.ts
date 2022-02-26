/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import {Request, Response} from "express";

/**
 * @class MessageControllerI Implements Data Access Object managing data storage
 * of Users
 * @property {MessageControllerI} userDao Private single instance of MessageControllerI
 */
export default interface MessageControllerI {
    findMessagesReceivedByUser (req: Request, res: Response): void;
    findMessagesSentByUser (req: Request, res: Response): void;
    userDeletesAMessage (req: Request, res: Response): void;
    userMessagesAnotherUser (req: Request, res: Response): void;
};