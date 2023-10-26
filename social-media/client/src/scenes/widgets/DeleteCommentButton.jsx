// Import necessary components from Material-UI
import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Define a functional component called 'DeleteCommentButton' that accepts two props
function DeleteCommentButton({ commentId, onDelete }) {
  // Return a Material-UI IconButton component with an onClick event handler
  // The onClick handler calls the 'onDelete' function with 'commentId' as an argument

  return (
    <IconButton onClick={() => onDelete(commentId)} >
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteCommentButton;
