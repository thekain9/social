// Import necessary components and hooks from Material-UI and Redux
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar/index";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidgets";
import AdvertWidget from "scenes/widgets/AdveriserWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

// Create a functional component named 'HomePage'
const HomePage = () => {
  // Check if the screen width is greater than or equal to 1000px// Check if the screen width is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

   // Get user information (user ID and profile picture) from the Redux state
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {_id && picturePath && <UserWidget userId={_id} picturePath={picturePath} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {picturePath && <MyPostWidget picturePath={picturePath} />}
          {_id && <PostsWidget userId={_id} />}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {_id && <FriendListWidget userId={_id} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
