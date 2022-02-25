"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
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
class MessageController {
    constructor() {
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid representing the user that is sending
         * messages and the userR receiving messages
         * @param {Response} res Represents response to client, including status
         * on whether finding the message received by user was successful or not
         */
        this.findMessagesReceivedByUser = (req, res) => MessageController.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid representing the user that is sending
         * messages and the userR receiving messages
         * @param {Response} res Represents response to client, including status
         * on whether finding the message by user was successful or not
         */
        this.findMessagesSentByUser = (req, res) => MessageController.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uidS and uidR representing the user that is sending
         * messages and the userR receiving messages
         * @param {Response} res Represents response to client, including status
         * on whether deleting the message by user was successful or not
         */
        this.userDeletesAMessage = (req, res) => MessageController.messageDao.userDeletesAMessage(req.params.uidS, req.params.uidR)
            .then(status => res.send(status));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uidS and uidR representing the user that is sending
         * messages and the userR receiving messages
         * @param {Response} res Represents response to client, including status
         * on whether message the user sent was successful or not
         */
        this.userMessagesAnotherUser = (req, res) => MessageController.messageDao.userMessagesAnotherUser(req.params.uidS, req.params.uidR, req.body)
            .then((messages) => res.json(messages));
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:uidS/messages/:uidR", MessageController.messageController.userMessagesAnotherUser);
        app.delete("/api/users/:uidS/messages/:uidR", MessageController.messageController.userDeletesAMessage);
        app.get("/api/users/:uid/messages", MessageController.messageController.findMessagesSentByUser);
        app.get("/api/users/:uid/receivedmessages", MessageController.messageController.findMessagesReceivedByUser);
    }
    return MessageController.messageController;
};
