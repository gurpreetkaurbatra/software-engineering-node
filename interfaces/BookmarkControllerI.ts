/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import {Request, Response} from "express";

/**
 * @class BookmarkCOntrollerI Implements Data Access Object managing data storage
 * of Users
 * @property {BookmarkCOntrollerI} userDao Private single instance of BookmarkCOntrollerI
 */
export default interface BookmarkControllerI {
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userUnBookmarksTuit (req: Request, res: Response): void;
};