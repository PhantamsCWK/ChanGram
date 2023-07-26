import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";


export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate("author", { 
            _id: 1, 
            username: 1, 
            firstName: 1, 
            lastName: 1, 
            picturePath: 1 
        }).sort({ createdAt: -1 });

        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
};

export const getUserPosts = async (req, res, next) => {
    try {
        const { author } = req.params;

        const user = await User.findOne({ username: author })

        if(!user) {
            res.status(404)
            next({ type: "notFound", message: "User Not Found" })
            return;
        }

        const posts = await Post.find({ author: user._id });

        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            next({ message: "Bad Request" });
            return
        }

        const post = await Post.findById(id).populate("author", { 
            _id: 1, 
            username: 1, 
            firstName: 1, 
            lastName: 1, 
            picturePath: 1,
        });

        if(!post) return res.status(404).json({ message: "post not found" });
        
        res.status(200).json({ post });
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { description } = req.body;
        const picture = req.file;
        const authId = req.user.id;

        if (!picture) {
            res.status(400);
            next({ message: "request need file" });
            return
        }


        const newPost = new Post({ 
            author: authId, 
            description, 
            pictureUrl: picture.path, 
            pictureId: picture.filename,
            likes: {}
        })

        const result = await newPost.save();

        await User.updateOne(
            { _id: req.user.id },
            { $inc: { postsCount: 1 } }
        );

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

        const photoCloud = await cloudinary.uploader.destroy(post.pictureId);

        const deletedPost = await Post.findByIdAndDelete(id);
    
        res.status(200).json(deletedPost);
    } catch (error) {
        next(error);
    }
};

export const likePost = async (req, res, next) => {
    try {
        const { id: postId } = req.params;
        const authId = req.user.id;

        const post =  await Post.findById(postId);
        
        if (!post) return res.status(400).json({ message: "post not found"});

        const isLiked = post.likes?.has(authId);

        let updatedPost ;

        if(isLiked){
            updatedPost = await Post.findOneAndUpdate(
                { _id: postId, updatedAt: post.updatedAt },
                { 
                    $unset: { [`likes.${authId}`]: null },
                    $inc: { likesCount: -1 }
                },
                { new: true }
            );
        } else {
            updatedPost = await Post.findOneAndUpdate(
                { _id: postId, updatedAt: post.updatedAt },
                { 
                    $set: { [`likes.${authId}`]: true },
                    $inc: { likesCount: 1 }
                },
                { new: true }
            );
        }


        res.status(200).json({ post: updatedPost });
    } catch (error) {
        next(error);
    }
};