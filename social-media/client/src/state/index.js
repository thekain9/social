// Import the 'createSlice' function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the Redux slice
const initialState = {
  mode: "light", // User interface mode (light or dark)
  user: null, // Current user's data
  token: null, // Authentication token
  posts: [], // List of user posts
};

// Create the 'authSlice' with the specified name and initial state
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for toggling the user interface mode between light and dark
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Reducer for setting user login status and data
    setLogin: (state, action) => {
      state.user = action.payload.user; // Set the current user data
      state.token = action.payload.token; // Set the authentication token
    },
    // Reducer for user logout
    setLogout: (state) => {
      state.user = null; // Clear the current user data on logout
      state.token = null; // Clear the authentication token on logout
    },
    // Reducer for setting the user's friends
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends; // Set the user's friends
      } else {
        console.error("user friends non-existent :("); // Log an error if user data doesn't exist
      }
    },
    // Reducer for setting user posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts; // Set the list of user posts
    },
    // Reducer for updating a specific user post
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    // Reducer for adding a comment to a post
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.comments.push(comment); // Add a new comment to the specified post
      }
    },
    // Reducer for deleting a post
    deletePost: (state, action) => {
      const postId = action.payload.postId;
      state.posts = state.posts.filter((post) => post._id !== postId); // Remove a post by filtering it out
    },
    // Reducer for editing a post
    editPost: (state, action) => {  // Function to edit a post in the state
      const updatedPost = action.payload.post; // Extract the updated post data from the action
      const postIndex = state.posts.findIndex((post) => post._id === updatedPost._id); // Find the index of the post to be edited in the state based on its _id
      if (postIndex !== -1) { // Check if the post was found in the state (index is not -1)
        state.posts[postIndex] = updatedPost; // Replace the post with the updated post data
      }
      console.log("Updating post in state:", action.payload.post);
    },
  },
});

// Export the action creators and reducer from the 'authSlice' for use in the application
export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addComment,
  deletePost,
  editPost,
} = authSlice.actions;
export default authSlice.reducer;
