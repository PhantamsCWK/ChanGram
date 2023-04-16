import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    picture_url: {
        type: String,
        required: true
    },
    picture_id: {
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
    }
}, { timestamps: true });

const Post = mongoose.model("Posts", PostSchema);

export default Post;