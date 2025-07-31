import bcrypt from "bcryptjs";

export const encryptPassword=async (password)=>{
    const salt=Number(process.env.SALT_ROUNDS);
    try{
        const encryptedPassword=await bcrypt.hash(password,salt);
        if(encryptedPassword) return encryptedPassword;
        else return "";
    } catch(error){
        console.log("error while encrypting password! : \n",error);
    }
}

export const comparePassword=async (password,hashPassword)=>{
    const checkPassword=await bcrypt.compare(password,hashPassword);
    return checkPassword;
}