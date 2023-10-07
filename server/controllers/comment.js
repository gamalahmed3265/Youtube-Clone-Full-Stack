import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment=async(req,res,next)=>{
    try {
        const comment=new Comment({userId:req.user.id,...req.body});

        await comment.save();
        res.status(200).json({
            success: true,
            status: 200,
            message: "The comment has been Added.",
            comment: comment
        });
    } catch (error) {
        next(err);
    }
}
export const deleteComment=async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
          await Comment.findByIdAndDelete(req.params.id);
          res.status(200).json({
            success: true,
            status: 200,
            message: "The comment has been deleted.",
        });
        } else {
          return next(createError(403, "You can delete ony your comment!"));
        }
      } catch (err) {
        next(err);
      }
    };
export const getComments=async(req,res,next)=>{
    try {
        const comment=await Comment.find({videoId:req.params.videoId});

        res.status(200).json({
            success: true,
            status: 200,
            message: "The comment has been Finded.",
            comment: comment
        });
    } catch (error) {
        next(err);
    }
}
