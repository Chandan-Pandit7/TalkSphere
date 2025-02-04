import jwt from 'jsonwebtoken';

export const generateToken = (userid,res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d'
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return token;

}