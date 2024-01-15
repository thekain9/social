import User from '../models/User.js';

//Read
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract the user ID from the request parameters
        const user = await User.findById(id); // Find a user by their ID in the database
        res.status(200).json(user); // Respond with the user data
    } catch (err) {
        res.status(404).json({ message: err.message }); // Handle errors and respond with an error message
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.paprams; // Extract the user ID from the request parameters (Note: There is a typo, it should be req.params, not req.paprams)
    const user = await User.findById(id); // Find a user by their ID in the database

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    ); // Retrieve the user's friends by their IDs
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    ); // Format the friend data to include only specific fields
    res.status(200).json(formattedFriends); // Respond with the formatted list of friends

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

//Update
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params; // Extract the user ID and friend ID from the request parameters
        const user = await User.findById(id); // Find the user by their ID
        const friend = await User.findById(friendId); // Find the friend by their ID

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId); // Remove the friend ID from the user's list of friends
            friend.friends = friend.friends.filter((id) => id !== id); // (Note: There is an issue here, it should be `friendId`, not `id`)
        } else {
            user.friends.push(friendId); // Add the friend ID to the user's list of friends
            friend.friends.push(id); // (Note: There is an issue here, it should be `friendId`, not `id`)
        }

        await user.save(); // Save the updated user data
        await friend.save(); // Save the updated friend data

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); // Retrieve the user's friends by their IDs

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        ); // Format the friend data to include only specific fields

        res.status(200).json(formattedFriends); // Respond with the updated list of friends

    } catch (err) {
        res.status(404).json({ message: err.message }); // Handle errors and respond with an error message
    }
}