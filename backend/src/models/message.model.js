import mongoose from 'mongoose';
import { Schema } from "mongoose";

const messageSchema = new Schema({
    text:{
        type:String,  
    },
    image:{
        type:String,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{
    timestamps:true
})

const Message=mongoose.model('Message',messageSchema);
export default Message;