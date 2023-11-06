// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, TextField, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost, deletePost, editPost } from 'state';

// Define the PostWidget component, which receives props
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  comments,
}) => {
  // Initialize local state variables
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch(); // Retrieve the dispatch function from Redux
  const token = useSelector((state) => state.token); // Get the token from Redux state
  const loggedInUserId = useSelector((state) => state.user._id); // Get the user's ID from Redux state

  const { palette } = useTheme(); // Get theme colors
  const main = palette.neutral.main; // Define the main color from the theme
  // const primary = palette.primary.main; // Define the primary color from the theme
  const loggedInUserFirstName = useSelector((state) => state.user.firstName); // Get user's first name from Redux state
  const loggedInUserLastName = useSelector((state) => state.user.lastName); // Get user's last name from Redux state

  // Initialize state variables for editing the post
  const [editingPost, setEditingPost] = useState(false);
  const [editedPostText, setEditedPostText] = useState(description);
  // const post = useSelector((state) => state.posts.find((p) => p._id === postId)); // Find the post by ID in Redux state
  // Use the useEffect hook to update editedPostText when description changes
  useEffect(() => {
    setEditedPostText(description);
  }, [description]);
  // Define an asynchronous function to add a comment to the post
  const addComment = async () => {
    const response = await fetch(`http://localhost:3002/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        firstName: loggedInUserFirstName,
        lastName: loggedInUserLastName,
        text: newComment,
      }),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost })); // Dispatch an action to update the post in Redux state
      setNewComment('');  // Clear the comment input field
    } else {
      // Handle error (e.g., log it, show an error message to the user)
      console.error("Failed to add comment", await response.text());
    }
  };

  const isAdmin = useSelector((state) => state.user.isAdmin); // Check if the user is an admin

  // Define an asynchronous function to delete the post
  const deletePostSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3002/posts/delete-post/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        // Log a success message and dispatch an action to remove the post from Redux state
        console.log(`Post ${postId} deleted successfully`);
        dispatch(deletePost({ postId }));
      } else {
        // Log an error if the deletion fails
        console.error(`Failed to delete post ${postId}`);
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("An error occurred while deleting the post:", error);
    }
  };

  // Define an asynchronous function to handle editing the post
  const handleEditPost = async () => {
    try {
      const response = await fetch(`http://localhost:3002/posts/edit-post/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editedPostText }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        console.log("Updated Description:", updatedPost.description);
        dispatch(editPost({ post: updatedPost })); // Dispatch an action to update the edited post in Redux state
        setEditingPost(false); // Set editing mode to false
      } else {
        // Log an error if editing the post fails
        console.error("Failed to edit post", await response.text());
      }
    } catch (error) {
      // Handle any errors that occur during the editing process
      console.error("An error occurred while editing the post:", error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
  
      <Typography color={main} sx={{ mt: "1rem" }}>
        {editingPost ? (
          <>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editedPostText}
              onChange={(e) => setEditedPostText(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleEditPost}>
              Save Post
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setEditingPost(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {description}
            {isAdmin && (
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                <Button variant="contained" color="success" onClick={() => setEditingPost(true)} style={{
                  backgroundColor: '#F2CA52', // Button color
                  padding: '.5rem',
                  color: '#F26052', // Text color
                  width: '48%', // Takes up almost half the space
                  fontSize: '1rem', // Larger font size
                  marginRight: '4%', // Space between the buttons
                }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={deletePostSubmit} style={{
                  backgroundColor: '#F2CA52', // Button color
                  padding: '.5rem',
                  color: '#F26052', // Text color
                  width: '48%', // Takes up almost half the space
                  fontSize: '1rem', // Larger font size
                  marginRight: '4%', // Space between the buttons
                }}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}
      </Typography>
  
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3002/assets/${picturePath}`}
        />
      )}
  
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
  
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => (
            <Box key={comment._id}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <strong>{comment.firstName} {comment.lastName}</strong>: {comment.text}
              </Typography>
            </Box>
          ))}
          <Divider />
          {isAdmin && (
            <Button variant="contained" color="secondary" onClick={deletePostSubmit}>
              Delete Post
            </Button>
          )}
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addComment}>
            Add Comment
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
  
};

export default PostWidget;