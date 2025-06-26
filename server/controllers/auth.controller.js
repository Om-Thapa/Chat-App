import User from "../models/user.model.js";
import bcrypt, { hash } from 'bcryptjs';

import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    const { fullname, password, email } = req.body;
    
    try {
        if(!fullname || !password || !email)
            return res.status(400).json({ message: "All field are required !"});

        if(password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters !"});

        const user = await User.findOne({email});
        if(user)
            return res.status(400).json({ message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            setTimeout(()=>{
                return res.status(200).json({
                    ...newUser._doc,
                    password: undefined
                });
            }, 1000)
        } else {
            res.status(400).json({ message: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { password, email } = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({ message: "Invalid  credentials !"});

        const match = await bcrypt.compare(password, user.password);

        if(!match)
            return res.status(400).json({ message: "Invalid password !" });
        
        generateToken(user._id, res);

        setTimeout(()=>{
            return res.status(200).json({
            ...user._doc,
            password: undefined
            });
        }, 1000)
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}