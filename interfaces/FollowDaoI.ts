/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllUsersThatFollowUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userUnfollowsAnotherUser (uid: string, uid1: string): Promise<any>;
    userFollowsAnotherUser (uid: string, uid1: string): Promise<Follow>;
};