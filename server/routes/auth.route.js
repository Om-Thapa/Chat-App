import express from 'express';

import { login, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout route : ",error.message);
        res.status(500).json({ message: "Internal Server Error !" });
    }
})

export default router;