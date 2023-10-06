import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    
    desc: {
        type: String,
        require: true,
    },
    imgUrl: {
        type: String,
        require: true,
    },
    videoUrl: {
        type: String,
        require: true,
    },
    views: {
        type: Number,
        default: 0,

    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    disliks: {
        type: [String],
        default: [],
    },
},
    {
        timeseries: true
    }
);

export default mongoose.model("Video",VideoSchema); 