import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassowrd, gender } = req.body;
        if (password !== confirmPassowrd) {
            return res.status(400).json({ error: "Password don't match" })
        }
        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({ error: "UserName already exists" })
        }
        // hash password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassowrd = await bcrypt.hash(password, salt)

        // avatar photo Pic

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const profilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassowrd,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : profilePic,
        });
        if (newUser) {
            //Generate JWT token here
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
            })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ error: 'Internal Server Error ' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName })

        const isPassowrdCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPassowrdCorrect) {
            return res.status(400).json({ error: 'Invalid username or passowrd' })
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userNAme: user.userName,
            profilePic: user.profilePic,

        })
    } catch (error) {
        console.log('Error in login cotroller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const logoutUser = async (req, res) => {
    try {

        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        console.log('Error in Logout Controller', error.message)
        res.status(500).json({ error: "Internal Server Error " })
    }
}

