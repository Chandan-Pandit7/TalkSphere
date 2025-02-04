import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { getReceiverSocketId ,io} from '../utils/socket.js';
import cloudinary from '../utils/cloudinary.js';


export const postSendMessage = async (req, res,next) => {
    const {id:receiverId}=req.params;
    const{text}=req.body;
    const senderId=req.user._id;

    try{
        let imageURL;
        if(req.files){
            // console.log(req.files);
            const cloudinaryResponse=await cloudinary.uploader.upload(req.files.image.tempFilePath);
            imageURL=cloudinaryResponse.secure_url;
        }

        const newMessage=await Message.create({
            text,
            image:imageURL,
            senderId,
            receiverId
        });
        await newMessage.save();

        const receiverSocketID=getReceiverSocketId(receiverId);
        if(receiverSocketID){
            io.to(receiverSocketID).emit('newMessage',newMessage);
        }


        return res.status(201).json({
            message: 'Message sent successfully',
            data: newMessage
        })

       
    }
    catch(error){
        console.log("error in postSendMessage Controller",error.message);
        return res.status(500).json({
            message: 'Internal server error! at send message'
        });
    }


}


export const getMessages = async (req, res,next) => {
    const {id:userTochatId}=req.params;
    const myId=req.user._id;
    try{
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userTochatId},
                {senderId:userTochatId,receiverId:myId}
            ]
        }).sort({createdAt:1}).populate('senderId','name').populate('receiverId','name');

        
        return res.status(200).json({
            message: 'Messages fetched successfully',
            data: messages
        })
    }
    catch(error){
        console.log("error in getMessages Controller",error.message);
        return res.status(500).json({
            message: 'Internal server error! at get messages'
        });
    }


}


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filtertedUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        return res.status(200).json(filtertedUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar Controller", error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
        
    }
}