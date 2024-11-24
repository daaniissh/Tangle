import PostDetails from "@/components/common/PostDeatils";
import { useScreenDevice } from "@/hooks/use_screen_device";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostMobilePage from "./PostMobilePage";
// import PostDetails from "./PostDetails"; // Your dialog component

const PostPage = () => {
  const { username, postId } = useParams();
  const navigate = useNavigate();

  // Function to close the dialog and navigate back to the home page or previous page
  const handleClose = () => {
    if (window.history.length > 2) {
      navigate(-1); // Go back if there is a previous history
    } else {
      navigate("/"); // Navigate to home if no previous history
    }
  };
  const { isTablet, isDesktop } = useScreenDevice()
  return (
    <div>
      {/* Render your dialog component */}
      {isDesktop && <PostDetails
        isDialogOpen={true} // Open the dialog when this component renders
        onClose={handleClose} // Pass the handleClose function to close the dialog
        username={username}
        postId={postId}
      />}
      {isTablet && <PostMobilePage username={username}
        postId={postId} />}
    </div>
  );
};

export default PostPage;
