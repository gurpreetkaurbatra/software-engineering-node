/**
 * @file Declares Message data type representing relationship between
 * users and tuits, as in user follows a tuit
 */
import User from "../users/User";

/**
 * @typedef Message Represents follows relationship between a user and a tuit,
 * as in a user follows a tuit
 * @property {message} message being sent
 * @property {to} to User
 * @property {from} from User
 * @property {sentOn} date message sent on
 */

export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn?: Date
};