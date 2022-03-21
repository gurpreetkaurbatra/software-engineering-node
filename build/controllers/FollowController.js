"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful Web service API for Follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followed to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all users following a user
 *     </li>
 *     <li>POST /api/users/:uid1/followed/:uid2 to record that a user2 follows another user1
 *     </li>
 *     <li>DELETE /api/users/:uid1/unfollows/:uid2 to record that a user
 *     no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    constructor() {
        /**
         * Retrieves all users who are followed by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for which the following are to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersFollowedByUser = (req, res) => FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));
        /**
         * Retrieves all other users that follow a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user for which followers are to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects that follow the given user
         */
        this.findAllUsersThatFollowUser = (req, res) => FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and uid1 representing the user that is following the user
         * and the user being followed
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new follow that was inserted in the
         * database
         */
        this.userFollowsAnotherUser = (req, res) => FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(follows => res.json(follows));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and uid1 representing the user that is unfollowing
         * the user and the user being unfollowed
         * @param {Response} res Represents response to client, including status
         * on whether unfollowing the user was successful or not
         */
        this.userUnfollowsAnotherUser = (req, res) => FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(status => res.send(status));
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.get("/api/users/:uid/followed", FollowController.followController.findAllUsersFollowedByUser);
        app.get("/api/users/:uid/following", FollowController.followController.findAllUsersThatFollowUser);
        app.post("/api/users/:uid1/followed/:uid2", FollowController.followController.userFollowsAnotherUser);
        app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnfollowsAnotherUser);
    }
    return FollowController.followController;
};
