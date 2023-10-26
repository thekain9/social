import React, { useState } from 'react';

// Define the EditComment component
function EditComment({ comment, onEdit }) {
  const [editedComment, setEditedComment] = useState(comment.text);
// Handle the edit action and call the onEdit function with updated data
  const handleEdit = () => {
    onEdit(comment.id, editedComment);
  };

  return (
    <div>
      <input value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
      <button onClick={handleEdit}>Save</button>
    </div>
  );
}

export default EditComment;