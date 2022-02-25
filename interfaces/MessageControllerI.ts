import {Request, Response} from "express";

export default interface MessageControllerI {
    findMessagesReceivedByUser (req: Request, res: Response): void;
    findMessagesSentByUser (req: Request, res: Response): void;
    userDeletesAMessage (req: Request, res: Response): void;
    userMessagesAnotherUser (req: Request, res: Response): void;
};