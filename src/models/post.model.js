import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        postFile: {
            type: String, //cloudinary url
            required: true
        },
        caption: {
            type: String, 
            required: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        mediaId: {
            type: String,
            required: true
        }


    }, 
    {
        timestamps: true
    }
)

postSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post", postSchema)