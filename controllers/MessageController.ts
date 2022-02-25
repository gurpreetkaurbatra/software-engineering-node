import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";
import Message from "../models/messages/Message";
/**
 * @class FollowController Implements RESTful Web service API for Message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/receivedmessages to retrieve all messages received by user
 *     </li>
 *     <li>GET /api/users/:uid/messages to retrieve all messages sent by user
 *     </li>
 *     <li>POST /api/users/:uidS/messages/:uidR to send the messages sent by a userS to userR
 *     </li>
 *     <li>DELETE /api/users/:uidS/messages/:uidR to delete teh message sent by userS to userR</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance=(app:Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uidS/messages/:uidR", MessageController.messageController.userMessagesAnotherUser)
            app.delete("/api/users/:uidS/messages/:uidR", MessageController.messageController.userDeletesAMessage)
            app.get("/api/users/:uid/messages", MessageController.messageController.findMessagesSentByUser)
            app.get("/api/users/:uid/receivedmessages", MessageController.messageController.findMessagesReceivedByUser)
        }
        return MessageController.messageController;
    }
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is sending
     * messages and the userR receiving messages
     * @param {Response} res Represents response to client, including status
     * on whether finding the message received by user was successful or not
     */
    findMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is sending
     * messages and the userR receiving messages
     * @param {Response} res Represents response to client, including status
     * on whether finding the message by user was successful or not
     */
    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidS and uidR representing the user that is sending
     * messages and the userR receiving messages
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message by user was successful or not
     */
    userDeletesAMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAMessage(req.params.uidS, req.params.uidR)
            .then(status => res.send(status));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uidS and uidR representing the user that is sending
     * messages and the userR receiving messages
     * @param {Response} res Represents response to client, including status
     * on whether message the user sent was successful or not
     */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uidS, req.params.uidR, req.body)
            .then((messages: Message) => res.json(messages))
}