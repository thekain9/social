import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        // No token in the header
        if (!token) {
            return res.status(403).send("Access denied! No token provided.");
        }

        // Extracting the JWT token from the "Bearer" string
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verifying the JWT token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).send("Invalid token. Verification failed.");
        }

        req.user = verified;
        next();

    } catch (err) {
        // If error is caused by JWT malformation or expiration
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Token error: " + err.message });
        }
        // For other unexpected errors
        res.status(500).json({ error: "An internal error occurred while verifying the token." });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).send("Access denied! Admin only.");
    }
};