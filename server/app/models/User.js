import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picturePath: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    following: {
        type: Array,
        default: []
    },
    follower: {
        type: Array,
        default: []
    },
}, { timestamps: true });

const User = mongoose.model("Users", UserSchema);

export default User;