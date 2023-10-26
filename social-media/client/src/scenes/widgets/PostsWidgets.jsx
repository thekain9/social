import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

// Define the PostsWidget component
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

   // Function to fetch and set posts
  const getPosts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3002/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Fetching posts failed with status: ", error.message);
    }
  }, [token, dispatch]);
  
   // Function to fetch and set user-specific posts
  const getUserPosts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Fetching user posts failed: ", error);
    }
  }, [token, dispatch, userId]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts(); // Fetch and set user-specific posts if the component is used in a user profile
    } else {
      getPosts(); // Fetch and set general posts if not in a user profile
    }
  }, [getPosts, getUserPosts, isProfile]);

  

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;