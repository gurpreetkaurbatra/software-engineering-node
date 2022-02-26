"use strict";
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../mongoose/messages/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Users
 * @property {MessageDao} userDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Fetches all messages received by users from the database.
         * @param uid primary key to fetch messages
         * @returns Promise To be notified when all users are returned from the
         * database
         */
        this.findMessagesReceivedByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ to: uid }); });
        /**
         * Fetches all tuits from the database.
         * @param uid primary key to fetch bookmarked tuits by user
         * @returns Promise To be notified when all tuits are returned from the
         * database
         */
        this.findMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ from: uid }); });
        /**
         * Deletes message sent by the user.
         * @param uidS, uidR primary key to delete message sent by user
         * @returns Promise To be notified when all message are deleted from the
         * database
         */
        this.userDeletesAMessage = (uidS, uidR) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ to: uidR, from: uidS }); });
        /**
         * Creates message ssent by a user to another user.
         * @param uidS, uidR, message primary key to create bookmarked tuits by user
         * @returns Promise To be notified when all tuits are created from the
         * database
         */
        this.userMessagesAnotherUser = (uidS, uidR, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: uidR, from: uidS })); });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
MessageDao.getInstance = () => {
    if (MessageDao.messageDao == null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
