import { createError } from "../err.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({
        userId: req.user.id,
        ...req.body
    });
    try {
        await newVideo.save();
        res.status(200).json({
            success: true,
            status: 200,
            message: "The video has been Added.",
            video: newVideo
        });
    } catch (err) {
        next(err);
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"))
        }
        if (req.user.id === video.userId) {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id,
                { $set: req.body }, {
                new: true
            }
            );
            res.status(200).json({
                success: true,
                status: 200,
                message: "The video has been Updated.",
                video: updateVideo
            });
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"))
        }
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id
            );
            res.status(200).json({
                success: true,
                status: 200,
                message: "The video has been Deleted.",
            });
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
}
// find
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"))
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "The video has been Finded.",
            video: video
        });
    } catch (error) {
        next(error);
    }
}
export const addView = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,
            { $inc: { views: 1 } },
        );
        if (!video) {
            return next(createError(404, "Video not found!"))
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "The view has been increased.",
            video: video
        });
    } catch (error) {
        next(error);
    }
}
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        if (!videos) {
            return next(createError(404, "Video not found!"))
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "The Videos has been Finded.",
            videos: videos
        });
    } catch (error) {
        next(error);
    }
}
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        if (!videos) {
            return next(createError(404, "Video not found!"))
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "The Videos has been Finded.",
            videos: videos
        });
    } catch (error) {
        next(error);
    }
}
export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
        res.status(200).json({
            success: true,
            status: 200,
            videos: videos
        });
    } catch (err) {
        next(err);
    }
};
export const search = async (req, res, next) => {
    try {
        const query = req.query.q;
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);

        res.status(200).json({
            success: true,
            status: 200,
            videos: videos
        });
    } catch (error) {
        next(error);
    }
}

