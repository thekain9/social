// Import required dependencies and modules
import express from "express"; // Import the Express.js framework
import bodyParser from "body-parser"; // Middleware for parsing request bodies
import mongoose from "mongoose"; // MongoDB ORM library
import cors from "cors"; // Middleware for handling CORS (Cross-Origin Resource Sharing)
import dotenv from "dotenv"; // Load environment variables from a .env file
import multer from "multer"; // Middleware for handling file uploads
import helmet from "helmet"; // Middleware for securing HTTP headers
import morgan from "morgan"; // Middleware for HTTP request logging
import path from "path"; // Node.js module for handling file paths
import { fileURLToPath } from "url"; // Convert file URL to a file path
import authRoutes from "./routes/auth.js"; // Import authentication routes
import userRoutes from "./routes/users.js"; // Import user-related routes
import postRoutes from "./routes/posts.js"; // Import post-related routes
import { register } from "./controllers/auth.js"; // Import authentication controller for registration
import { createPost } from "./controllers/post.js"; // Import controller for creating posts
import { verifyToken } from "./middleware/auth.js"; // Middleware for token verification

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* 404 NOT FOUND MIDDLEWARE */
app.use((req, res, next) => {
  console.log(req)
    res.status(404).send('Sorry, we cannot find that, not found:(!');
});

/* ERROR HANDLING MIDDLEWARE */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));