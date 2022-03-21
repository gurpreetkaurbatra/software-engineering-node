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
class FollowDao {
    constructor() {
        this.findAllUsersFollowedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ user: uid })
                .populate("userFollowed")
                .exec();
        });
        this.findAllUsersThatFollowUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowed: uid })
                .populate("userFollowing")
                .exec();
        });
        this.userFollowsAnotherUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowed: uid1, user: uid }); });
        this.userUnfollowsAnotherUser = (uid, uid1) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowed: uid1, user: uid }); });
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
