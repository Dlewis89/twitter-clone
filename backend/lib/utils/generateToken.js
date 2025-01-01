import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {
            expiresIn: '15d'
        });
    console.log('set token')
    console.log(process.env.APP_ENV)
        res.cookie("jwt", token, {
            maxAge: 15*24*60*60*1000,
            httpOnly: true, // prevent XSS attacks
            sameSite: "strict", // prevent CSRF Attacks
            secure: process.env.APP_ENV !== 'development'
        });

    console.log('cookie set')
}