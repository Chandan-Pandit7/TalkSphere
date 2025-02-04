import mongoose from 'mongoose';
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String, //cloudinary url
        default:""
    },
   
},{
    timestamps:true
})

//hashing the password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
       
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);

    }
    next();
})

//match password
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
const User=mongoose.model('User',userSchema);
export default User;