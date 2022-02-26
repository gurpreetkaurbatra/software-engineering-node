/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Users
 * @property {BookmarkDao} userDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Fetches all users from the database.
     * @param tid primary key to fetch bookmarked tuits
     * @returns Promise To be notified when all users are returned from the
     * database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();

    /**
     * Fetches all tuits from the database.
     * @param uid primary key to fetch bookmarked tuits by user
     * @returns Promise To be notified when all tuits are returned from the
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Creates bookmarked tuits.
     * @param uid, tid primary key to create bookmarked tuits by user
     * @returns Promise To be notified when all tuits are created from the
     * database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    /**
     * Deletes bookmarked tuits.
     * @param uid, tid primary key to create bookmarked tuits by user
     * @returns Promise To be notified when all tuits are deleted from the
     * database
     */
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}