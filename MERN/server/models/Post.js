import mongoose from 'mongoose';

// Define a Mongoose schema for the 'Post' collection
const postSchema = mongoose.Schema(
    {
        userId: {
            type: String, // Data type for the user ID associated with the post
            required: true, // This field is required for a post document
        },
        firstName: {
            type: String, // Data type for the first name of the post author
            required: true, // This field is required for a post document
        },
        lastName: {
            type: String, // Data type for the last name of the post author
            required: true, // This field is required for a post document
        },
        location: String, // Data type for the location where the post was created
        description: String, // Data type for the description or content of the post
        picturePath: String, // Data type for the path to the post's main picture
        userPicturePath: String, // Data type for the path to the post author's profile picture
        likes: {
            type: Map, // Data type for storing likes, using a Map to associate users with like status (true/false)
            of: Boolean, // The values stored in the Map are of type Boolean
        },
        comments: {
            type: Array, // Data type for storing comments as an array
            default: [], // If not provided, the 'comments' field defaults to an empty array
        }
    },
    { timestamps: true } // Include timestamps for document creation and modification
);

// Create a Mongoose model for the 'Post' collection using the defined schema
const Post = mongoose.model('Post', postSchema);

export default Post; // Export the 'Post' model for use in other parts of the application
