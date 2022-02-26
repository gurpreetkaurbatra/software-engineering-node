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
const BookmarkModel_1 = __importDefault(require("../mongoose/bookmarks/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Users
 * @property {BookmarkDao} userDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Fetches all users from the database.
         * @param tid primary key to fetch bookmarked tuits
         * @returns Promise To be notified when all users are returned from the
         * database
         */
        this.findAllUsersThatBookmarkedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ tuit: tid })
                .populate("bookmarkedBy")
                .exec();
        });
        /**
         * Fetches all tuits from the database.
         * @param uid primary key to fetch bookmarked tuits by user
         * @returns Promise To be notified when all tuits are returned from the
         * database
         */
        this.findAllTuitsBookmarkedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedBy: uid })
                .populate("tuit")
                .exec();
        });
        /**
         * Creates bookmarked tuits.
         * @param uid, tid primary key to create bookmarked tuits by user
         * @returns Promise To be notified when all tuits are created from the
         * database
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ tuit: tid, bookmarkedBy: uid }); });
        /**
         * Deletes bookmarked tuits.
         * @param uid, tid primary key to create bookmarked tuits by user
         * @returns Promise To be notified when all tuits are deleted from the
         * database
         */
        this.userUnBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ tuit: tid, bookmarkedBy: uid }); });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
