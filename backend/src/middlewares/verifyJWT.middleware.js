import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const verifyjwt = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        // console.log(token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized! - No Token found!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized! - Invalid Token" });
        }

        const user = await User.findById(decoded.userid).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized! - User not found" });
        }

        req.user = user;
        next();

    } 
    catch (error) {
        console.log("Error in verifyjwtRoute", error.message);
        return res.status(500).json({ message: "Internal Server Error!:Error in protectRoute" });
    }
}