import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { author } = req.params;

        const user = await User.findOne({ username: author })

        if(!user) return res.status(404).json({ message: "user not found" });

        const posts = await Post.find({ author });

        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "bad request" });

        const post = await Post.findById(id);

        if(post){
            res.status(200).json({ post });
        }
        
        res.status(404).json({ message: "post not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { author, description } = req.body;

        if (!req.file) return res.status(400).json({ message: "response need file" });

        const picture = req.file;

        const newPost = new Post({ 
            author, 
            description, 
            picture_url: picture.path, 
            picture_id: picture.filename,
            likes: {} })

        const result = await newPost.save();

        res.status(201).json({
            post: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post =  await Post.findById(id);
    
        if (!post) return res.status(400).json({ message: "post not found"});

        const photoCloud = await cloudinary.uploader.destroy(post.picture_id);

        console.log(photoCloud)

        const deletedPost = await Post.findByIdAndDelete(id);
    
        res.status(200).json({ post: deletedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    try {
        const { id: post_id } = req.params;
        const user_id = req.user._id;

        const post =  await Post.findById(post_id);
        
        if (!post) return res.status(400).json({ message: "post not found"});

        const isLiked = post.likes.has(user_id);

        if(isLiked){
            post.likes.delete(user_id);
        } else {
            post.likes.set(user_id, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post_id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json({ post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};