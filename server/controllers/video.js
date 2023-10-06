import { createError } from "../err.js";
import Video from "../models/Video.js";

export const addVideo=async(req,res,next)=>{
    const newVideo=new Video({
        userId:req.user.id,
        ...req.body});
    try{
        await newVideo.save();
        res.status(200).json({
            success: true,
            status: 200,
            message: "The video has been Added.",
            video:newVideo
        });
    }catch(err){
        next(err);
    }
}
export const updateVideo =async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"))
        }
        if (req.user.id===video.userId) {
            const updateVideo=await Video.findByIdAndUpdate(req.params.id,
                {$set :req.body},{
                    new:true
                }
                );
            res.status(200).json({
                success: true,
                status: 200,
                message: "The video has been Updated.",
                video:updateVideo
            });
        }else{
            return next(createError(403, "You can update only your video!"));
        }
    }catch(err){
        next(err);
    }
}
export const deleteVideo  =async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"))
        }
        if (req.user.id===video.userId) {
            const updateVideo=await Video.findByIdAndUpdate(req.params.id,
                {$set :req.body},{
                    new:true
                }
                );
            res.status(200).json({
                success: true,
                status: 200,
                message: "The video has been Updated.",
                video:updateVideo
            });
        }else{
            return next(createError(403, "You can update only your video!"));
        }
    }catch(err){
        next(err);
    }
}
export const addView=async(req,res,next)=>{

}
export const getByTag=(req,res,next)=>{
    console.log("dfd");
    res.json({
        message:"Its Successful"
    });
}
export const getVideo=(req,res,next)=>{
    console.log("dfd");
    res.json({
        message:"Its Successful"
    });
}
export const random=(req,res,next)=>{
    console.log("dfd");
    res.json({
        message:"Its Successful"
    });
}
export const search=(req,res,next)=>{
    console.log("dfd");
    res.json({
        message:"Its Successful"
    });
}
export const sub=(req,res,next)=>{
    console.log("dfd");
    res.json({
        message:"Its Successful"
    });
}
export const trend=(req,res,next)=>{
    console.log("dfd");
    res.json({
        message:"Its Successful"
    });
}

