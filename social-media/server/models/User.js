import mongoose from "mongoose";

// Define a Mongoose schema for the 'User' collection
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, // Data type for the user's first name
      required: true, // This field is required for a user document
      min: 2, // Minimum character length for the first name
      max: 50, // Maximum character length for the first name
    },
    lastName: {
      type: String, // Data type for the user's last name
      required: true, // This field is required for a user document
      min: 2, // Minimum character length for the last name
      max: 50, // Maximum character length for the last name
    },
    email: {
      type: String, // Data type for the user's email
      required: true, // This field is required for a user document
      max: 50, // Maximum character length for the email
      unique: true, // Ensures that email addresses are unique across user documents
    },
    passwordHash: {
      type: String, // Data type for the user's password hash
      required: true, // This field is required for a user document
      min: 5, // Minimum character length for the password hash
    },
    picturePath: {
      type: String, // Data type for the path to the user's profile picture
      default: "", // Default value is an empty string
    },
    friends: {
      type: Array, // Data type for storing an array of user's friends
      default: [], // Default value is an empty array
    },
    location: String, // Data type for the user's location
    occupation: String, // Data type for the user's occupation
    viewedProfile: Number, // Data type for a numeric field representing viewed profiles
    impressions: Number, // Data type for a numeric field representing impressions
    isAdmin: {
      type: Boolean, // Data type for a boolean field indicating admin status
      default: false, // Default is false, making the user a regular user
    },
  },
  { timestamps: true } // Include timestamps for document creation and modification
);

// Create a Mongoose model for the 'User' collection using the defined schema
const User = mongoose.model("User", UserSchema);

export default User; // Export the 'User' model for use in other parts of the application
