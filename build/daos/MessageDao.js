"use strict";
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
class MessageDao {
    constructor() {
        this.findMessagesReceivedByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ to: uid }); });
        this.findMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ from: uid }); });
        this.userDeletesAMessage = (uidS, uidR) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ to: uidR, from: uidS }); });
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
