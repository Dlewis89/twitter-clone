import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],
    prfileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema)