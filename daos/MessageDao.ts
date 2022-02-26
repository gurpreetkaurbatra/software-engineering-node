/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Users
 * @property {MessageDao} userDao Private single instance of MessageDao
 */

export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null

    public static getInstance=(): MessageDao =>{
        if(MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Fetches all messages received by users from the database.
     * @param uid primary key to fetch messages
     * @returns Promise To be notified when all users are returned from the
     * database
     */
    findMessagesReceivedByUser = async(uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});

    /**
     * Fetches all tuits from the database.
     * @param uid primary key to fetch bookmarked tuits by user
     * @returns Promise To be notified when all tuits are returned from the
     * database
     */
    findMessagesSentByUser = async(uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});

    /**
     * Deletes message sent by the user.
     * @param uidS, uidR primary key to delete message sent by user
     * @returns Promise To be notified when all message are deleted from the
     * database
     */
    userDeletesAMessage = async (uidS: string, uidR: string): Promise<any> =>
        MessageModel.deleteOne({to: uidR, from: uidS});

    /**
     * Creates message ssent by a user to another user.
     * @param uidS, uidR, message primary key to create bookmarked tuits by user
     * @returns Promise To be notified when all tuits are created from the
     * database
     */
    userMessagesAnotherUser = async(uidS: string, uidR: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uidR, from: uidS})
}