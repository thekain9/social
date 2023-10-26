import express from 'express';
import { login, 
    register, 
    googleLogin, 
    googleRedirect,
    githubLogin,
    githubRedirect } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.get('/auth/google/callback', googleRedirect);
router.post('/google-login', googleLogin);

// GitHub Routes
router.get('/auth/github', githubLogin);
router.get('/auth/github/callback', githubRedirect);




export default router;