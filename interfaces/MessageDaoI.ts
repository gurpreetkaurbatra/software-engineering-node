/**
 * @file Declares API for Message related data access object methods
 */
import Message from "../models/messages/Message";

export default interface FollowDaoI {
    findMessagesReceivedByUser (uid: string): Promise<Message[]>;
    findMessagesSentByUser (uid: string): Promise<Message[]>;
    userDeletesAMessage (uidS: string, uidR: string): Promise<any>;
    userMessagesAnotherUser (uidS: string, uidR: string, message: Message): Promise<Message>;
};