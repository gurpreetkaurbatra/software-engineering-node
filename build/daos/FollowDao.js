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
const FollowModel_1 = __importDefault(require("../mongoose/follows/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Users
 * @property {FollowDao} userDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Fetches all users from the database that the user follows.
         * @param tid primary key to fetch bookmarked tuits
         * @returns Promise To be notified when all users are returned from the
         * database
         */
        this.findAllUsersFollowedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowing: uid })
                .populate("userFollowed")
                .exec();
        });
        /**
         * Fetches all users from the database that follows user.
         * @param uid primary key to fetch bookmarked tuits by user
         * @returns Promise To be notified when all tuits are returned from the
         * database
         */
        this.findAllUsersThatFollowUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowed: uid })
                .populate("userFollowing")
                .exec();
        });
        /**
         * Creates a entry of a user following another user.
         * @param uid, uid1 primary key to create follow user
         * @returns Promise To be notified when all tuits are created from the
         * database
         */
        this.userFollowsAnotherUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowed: uid1, userFollowing: uid }); });
        /**
         * Deletes user following another user.
         * @param uid, uid1 primary key to delete followed user
         * @returns Promise To be notified when all followed user are deleted from the
         * database
         */
        this.userUnfollowsAnotherUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowed: uid1, userFollowing: uid }); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
