import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navBar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidgets";
import UserWidget from "scenes/widgets/UserWidget";

// Define the ProfilePage component
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // Get the user ID from the URL parameters
  const token = useSelector((state) => state.token); // Get the user's authentication token from Redux state
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Determine if the screen is non-mobile

  // Function to fetch user data based on the user ID and token
  const getUser = async () => {
    const response = await fetch(`http://localhost:3002/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data); // Set the user data in the component's state
  };

  useEffect(() => {
    getUser(); // Fetch user data when the component mounts
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;