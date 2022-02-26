/**
 * @file Declares Follow data type representing relationship between
 * users and tuits, as in user follows a tuit
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between a user and a tuit,
 * as in a user follows a tuit
 * @property {userFollowed} userFollowed by another user
 * @property {userFollowing} Userfollowing another user
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User
};