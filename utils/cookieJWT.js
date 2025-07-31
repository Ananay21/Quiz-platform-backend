import jwt from "jsonwebtoken";

export const verifyJWT=async (userId,res)=>{
    const token=await jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});

    res.cookie("jwt",token,
        {
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict"
        }
    );

    return token;
}