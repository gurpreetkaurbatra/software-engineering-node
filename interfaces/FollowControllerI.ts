/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import {Request, Response} from "express";

/**
 * @class FollowControllerI Implements Data Access Object managing data storage
 * of Users
 * @property {FollowControllerI} userDao Private single instance of FollowControllerI
 */
export default interface FollowControllerI {
    findAllUsersThatFollowUser (req: Request, res: Response): void;
    findAllUsersFollowedByUser (req: Request, res: Response): void;
    userUnfollowsAnotherUser (req: Request, res: Response): void;
    userFollowsAnotherUser (req: Request, res: Response): void;
};