import mongoose from "mongoose";

const connectDB=async ()=>{
    const mongoDBConnection=process.env.MONGO_DB_CONNECTION;
    try {
        const check=await mongoose.connect(mongoDBConnection);
        if(check){
            console.log("connection successful!");
            return true;
        }
        else return false;
    } catch (error) {
        console.log("error in connecting to MongoDB :",error);
    }
}

export default connectDB;