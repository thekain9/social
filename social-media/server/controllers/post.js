import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body; 
    console.log(userId);
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    console.log(userId); // log parameters
    

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  const { postId } = req.params; // Extracting postId from the route parameters
  const { userId, firstName, lastName, text } = req.body; // Extracting details from the request body
  console.log('Post ID:', postId);
  console.log(req.params.postId); // log postId

  try {
    // Finding the post by postId
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log('Post before adding comment:', post); 
    // Creating a new comment
    const newComment = {
      userId, // User who made the comment
      firstName, // First name of the user who made the comment
      lastName, // Last name of the user who made the comment
      text, // Comment text
      createdAt: new Date().toISOString(), // Adding a timestamp
    };
    
    // Adding the new comment to the post's comments array
    post.comments.push(newComment);
    
    
    // Saving the updated post
    const updatedPost = await post.save();
    console.log('Updated Post:', updatedPost); 
    
    // Sending the updated post as a JSON response
    res.json(updatedPost);
    
  } catch (error) {
    // Handling errors and sending a JSON response with the error message
    res.status(500).json({ error: error.message });
  }
};


//DELETE
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the post ID from the route parameters
    
    // Finding and deleting the post by its ID
    const deletedPost = await Post.findByIdAndDelete(id);
    
    // If no post is found with the given ID, send a 404 error
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Sending a JSON response with the details of the deleted post
    res.json({ message: 'Post deleted successfully', deletedPost });
    
  } catch (err) {
    // Handling errors and sending a JSON response with the error message
    res.status(500).json({ message: err.message });
  }
};

//EDIT
export const editPost = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the post ID from the route parameters
    const { description, picturePath } = req.body; // Extracting updated data from the request body

    // Finding the post by ID
    const post = await Post.findById(id);

    // If no post is found with the given ID, send a 404 error
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Updating the post's data
    if (description) post.description = description;
    if (picturePath) post.picturePath = picturePath;

    // Saving the updated post
    const updatedPost = await post.save();

    // Sending a JSON response with the details of the updated post
    res.json({ message: 'Post updated successfully', updatedPost });

  } catch (err) {
    // Handling errors and sending a JSON response with the error message
    res.status(500).json({ message: err.message });
  }
};
