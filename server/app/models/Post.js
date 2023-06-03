import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    description: {
        type: String,
        default: ""
    },
    pictureUrl: {
        type: String,
        required: true
    },
    pictureId: {
        type: String,
        required: true
    },
    likes: {
        type: Map,
        of: String
    },
    hidden: {
        type: Boolean,
        default: false
    },
    likesCount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }
}, { timestamps: true });

const Post = mongoose.model("Posts", PostSchema);

export default Post;