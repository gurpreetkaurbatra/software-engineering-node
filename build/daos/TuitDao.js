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
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
const TuitModel_1 = __importDefault(require("../mongoose/tuits/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() {
        /**
         * Uses TuitModel to retrieve all tuit documents from tuits collection
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find(); });
        /**
         * Uses TuitModel to retrieve all tuit document from tuits collection
         * @param {string} uid User's primary key
         * @returns Promise To be notified when tuit is retrieved from the database
         */
        this.findAllTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postedBy: uid })
                .sort({ 'postedOn': -1 })
                .populate("postedBy")
                .exec();
        });
        /**
         * Uses TuitModel to retrieve single tuit document from tuits collection
         * @param {string} uid User's primary key
         * @returns Promise To be notified when tuit is retrieved from the database
         */
        this.findTuitById = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(uid)
                .populate("postedBy")
                .exec();
        });
        /**
         * Inserts tuit instance into the database
         * @param {User} uid Primary key of user that posts the tuit
         * @param {Tuit} tuit Instance to be inserted into the database
         * @returns Promise To be notified when tuit is inserted into the database
         */
        this.createTuitByUser = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
         * Updates tuit with new values in database
         * @param {string} uid Primary key of user to be modified
         * @param {Tuit} tuit Tuit object containing properties and their new values
         * @returns Promise To be notified when tuit is updated in the database
         */
        this.updateTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: uid }, { $set: tuit });
        });
        /**
         * Updates likes count with new values in database
         * @param {string} tid Primary key of tuit stas to be modified
         * @param {any} newStats new stats object for the tuit to be updated
         * @returns Promise To be notified when tuit stats is updated in the database
         */
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
        /**
         * Removes tuit from the database.
         * @param {string} uid Primary key of user tuit to be removed
         * @returns Promise To be notified when user tuit is removed from the database
         */
        this.deleteTuit = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: uid }); });
        /**
         * Removes tuit from the database.
         * @param {string} tid Primary key of tuit to be removed
         * @returns Promise To be notified when user tuit is removed from the database
         */
        this.deleteTuitById = (tid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: tid }); });
        /**
         * Removes tuit from the database.
         * @param {string} tuit content of the tuit to be removed
         * @returns Promise To be notified when user tuit is removed from the database
         */
        this.deleteTuitByContent = (tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteMany({ tuit }); });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
