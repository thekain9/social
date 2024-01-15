import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Register user
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; // Extract user registration data from the request body


        const salt = await bcrypt.genSalt(); //A salt is a random data element that is used as an additional input to the password hashing function
        const passwordHash = await bcrypt.hash(password, salt); // Hash the user's password
        const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), // Create some random values
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save(); // Save the user object to the database

        // Remove the passwordHash before sending the user data
        savedUser.passwordHash = undefined; 
        res.status(201).json(savedUser); // Send the user data (with password removed) as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ msg: "User does not exist!" });

        // Compare with passwordHash
        const isMatch = await bcrypt.compare(password, user.passwordHash); 
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        // Remove the passwordHash before sending the user data
        user.passwordHash = undefined; 
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const googleLogin = (req, res) => {
    // Redirect to Google authentication
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=180057569407-tp2sl38ut0ppbe0ntpvf383ka7eo0itt.apps.googleusercontent.com&redirect_uri=http://localhost:3002/auth/google/callback&response_type=code&scope=openid%20profile%20email`);
};

export const googleRedirect = async (req, res) => {
    try {
        const { code } = req.body;
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: '180057569407-tp2sl38ut0ppbe0ntpvf383ka7eo0itt.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uri: 'http://localhost:3002/auth/google/callback',
            grant_type: 'authorization_code',
        });

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${response.data.access_token}` },
        });

        res.json(userInfo.data);
    } catch (error) {
        res.status(500).send('Authentication failed');
    }
};


export const githubLogin = (req, res) => {
    const githubAuthUrl = 'https://github.com/login/oauth/authorize';
    const clientID = '48a20a073b561030f8c7';
    const redirectURI = 'http://localhost:3002/auth/github/callback';
    const scope = 'user';
    
    res.redirect(`${githubAuthUrl}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}`);
};

export const githubRedirect = async (req, res) => {
    try {
        const { code } = req.query;
        const clientID = '48a20a073b561030f8c7';
        const clientSecret = 'a6c7faf843c1baac36b6615e06219faf5b03594e';
        const redirectURI = 'http://localhost:3002/auth/github/callback';
        
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: clientID,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectURI,
        }, {
            headers: { 'Accept': 'application/json' }
        });

        const accessToken = response.data.access_token;

        const userInfo = await axios.get('https://api.github.com/user', {
            headers: { 'Authorization': `token ${accessToken}` }
        });

        res.json(userInfo.data);

    } catch (error) {
        res.status(500).send('Authentication failed');
    }
};

