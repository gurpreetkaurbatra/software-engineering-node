import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";



const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "FollowModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "FollowModel"},
}, {collection: "follows"});
export default FollowSchema;