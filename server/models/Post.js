import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({

});

const Post = mongoose.model("Posts", PostSchema);

export default Post;