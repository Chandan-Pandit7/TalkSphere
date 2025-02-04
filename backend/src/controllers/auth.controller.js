import User from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';
import {generateToken}  from '../utils/generateToken.js';


export const postSignup = async (req, res,next) => {
    const { name, email, password } = req.body;
    // console.log(name, email, password);

    const requiredFields = ['name', 'email', 'password'];
    const incomingFields = Object.keys(req.body);

    const missingFields = requiredFields.filter(field => !incomingFields.includes(field));
    if (missingFields.length>0) {
        return res.status(400).json({
            message: 'Missing required fields',
            missingFields
        });
    }
    if(password.length<6){
        return res.status(400).json({
            message: 'Password length should be atleast 6 characters'
        });
    }
    const user=await User.findOne({email:email});
    if(user){
        return res.status(400).json({
            message: 'User already exists'
        });
    }
    let avatar=`https://api.dicebear.com/9.x/adventurer/svg?seed=${name}`;
    
    try{
        const newuser=await User.create({
            name,
            email,
            password,
            profilePic:avatar
        })
        if(newuser){
            generateToken(newuser._id,res);
            await newuser.save();
            return res.status(201).json({
                message: 'User created successfully',
                user:newuser
            });
        }
       
    }
    catch(error){
        console.log("error in postSignup Controller",error.message);
        return res.status(500).json({
            message: 'Internal server error'
    });

}

}


export const postLogin = async (req, res,next) => {
    const { email, password } = req.body;
    // console.log(email, password);

    const requiredFields = ['email', 'password'];
    const incomingFields = Object.keys(req.body);

    const missingFields = requiredFields.filter(field => !incomingFields.includes(field));
    if (missingFields.length>0) {
        return res.status(400).json({
            message: 'Missing required fields',
            missingFields
        });
    }
   
   
    try{
        const user=await User.findOne({email:email});

        if(!user){
            return res.status(400).json({
                message: 'User does not exist'
            });
        }


        if(user){
            const isMatch=await user.matchPassword(password);
            if(isMatch){
                generateToken(user._id,res);

                return res.status(200).json({
                    message: "User logged in successfully!",
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePic: user.profilePic
                    },
                });
                
            }
            else{
                return res.status(400).json({
                    message: 'Invalid password'
                });
            }


        }

    }
    catch(error){
        console.log("error in postLogin Controller",error.message);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }

}


export const postForgotPassword = async (req, res,next) => {
    const {email,updatedPassword}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                message: 'User does not exist'
            });
        }
        user.password=updatedPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password updated successfully'
        });
      
    }
    catch(error){
        console.log("error in postForgotPassword Controller",error.message);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


export const postLogout = async (req, res,next) => {
    try{
        res.cookie("jwt","",{
            maxAge:0
        })
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    }
    catch(error){
        console.log("error in postLogout Controller",error.message);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


export const postUpdateProfile = async (req, res,next) => {
    // console.log(req.user);
    // req.user se logged in user milta hai
    // req.files se uploaded file milta hai
    // req.body se form data milta hai

    try{
        let userId=req.user._id;
        // console.log(req.files.profilePic.tempFilePath);

        if(!req.files){
            return res.status(400).json({
                message: 'profile pic is required'
            });
        }
        const cloudinaryResponse=await cloudinary.uploader.upload(req.files.profilePic.tempFilePath);
        // console.log(cloudinaryResponse);
        const profilePic=cloudinaryResponse.secure_url;
        // console.log(cloudinaryResponse.secure_url);

        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:profilePic},{new:true});
        await updatedUser.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            user:updatedUser
        });
    }
    catch(error){
            console.log("error in postUpdateProfile Controller",error.message);
            return res.status(500).json({
                message: 'Internal server error'
            });
    }


}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        console.log("Error in checkAuth Controller",error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}