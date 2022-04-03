/**
 * @file Implements mongoose schema for Like
 */

import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents Like made on Tuits
 * @property {ObjectId[]} tuit Array of Tuit IDs
 * @property {ObjectId[]} likedBy Array of User IDs
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});

export default LikeSchema;