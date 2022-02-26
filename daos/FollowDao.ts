/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Users
 * @property {FollowDao} userDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Fetches all users from the database that the user follows.
     * @param tid primary key to fetch bookmarked tuits
     * @returns Promise To be notified when all users are returned from the
     * database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Fetches all users from the database that follows user.
     * @param uid primary key to fetch bookmarked tuits by user
     * @returns Promise To be notified when all tuits are returned from the
     * database
     */
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Creates a entry of a user following another user.
     * @param uid, uid1 primary key to create follow user
     * @returns Promise To be notified when all tuits are created from the
     * database
     */
    userFollowsAnotherUser = async (uid: string, uid1: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid1, userFollowing: uid});

    /**
     * Deletes user following another user.
     * @param uid, uid1 primary key to delete followed user
     * @returns Promise To be notified when all followed user are deleted from the
     * database
     */
    userUnfollowsAnotherUser = async (uid: string, uid1: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid1, userFollowing: uid});
}