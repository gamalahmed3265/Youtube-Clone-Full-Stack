import mongoose from "mongoose";

const connectDB = () => {
    mongoose
        .connect(process.env.mongoConnectId)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            throw err;
        });
};

export default connectDB;
