import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";


export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
};

export const getUserPosts = async (req, res, next) => {
    try {
        const { author } = req.params;

        const user = await User.findOne({ username: author })

        if(!user) return res.status(404).json({ message: "user not found" });

        const posts = await Post.find({ author });

        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "bad request" });

        const post = await Post.findById(id);

        if(!post) return res.status(404).json({ message: "post not found" });
        
        res.status(200).json({ post });
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { description } = req.body;

        if (!req.file) return res.status(400).json({ message: "response need file" });

        const picture = req.file;

        const newPost = new Post({ 
            author: req.user.username, 
            description, 
            picture_url: picture.path, 
            picture_id: picture.filename,
            likes: {} })

        const result = await newPost.save();

        res.status(201).json({
            post: result
        });
    } catch (error) {
        next(error)
    }


};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post =  await Post.findById(id);
    
        if (!post) return res.status(400).json({ message: "post not found"});

        const photoCloud = await cloudinary.uploader.destroy(post.picture_id);

        const deletedPost = await Post.findByIdAndDelete(id);
    
        res.status(200).json({ post: deletedPost });
    } catch (error) {
        next(error);
    }
};

export const likePost = async (req, res, next) => {
    try {
        const { id: post_id } = req.params;
        const username = req.user.username;

        const post =  await Post.findById(post_id);
        
        if (!post) return res.status(400).json({ message: "post not found"});

        const isLiked = post.likes.has(username);

        if(isLiked){
            post.likes.delete(username);
        } else {
            post.likes.set(username, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post_id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json({ post: updatedPost });
    } catch (error) {
        next(error);
    }
};