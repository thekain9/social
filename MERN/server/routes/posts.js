import express from "express";
import { addComment, getFeedPosts, getUserPosts, likePost, deletePost, editPost  } from "../controllers/post.js";

// import { getFeedPosts, getUserPosts, likePost, editComment, deleteComment } from "../controllers/posts.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

router.post('/:postId/comments', verifyToken, addComment);

router.delete('/delete-post/:id', verifyToken, verifyAdmin, deletePost);

router.put('/edit-post/:id', verifyToken, verifyAdmin, editPost);

export default router;