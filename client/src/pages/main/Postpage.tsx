import PostDetails from "@/components/common/PostDeatils";
import { useScreenDevice } from "@/hooks/use_screen_device";

import { useParams, useNavigate } from "react-router-dom";
import PostMobilePage from "./PostMobilePage";
import { Socket } from "socket.io-client";
// import PostDetails from "./PostDetails"; // Your dialog component

const PostPage = ({ socket }:{socket:Socket | null}) => {
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
    <div  >
      {/* Render your dialog component */}
      {isDesktop && <PostDetails
        socket={socket}
        isDialogOpen={true} // Open the dialog when this component renders
        onClose={handleClose} // Pass the handleClose function to close the dialog
        username={username}
        postId={postId}
      />}
      {isTablet &&
        <PostMobilePage    socket={socket} username={username}
          postId={postId} />}
    </div>
  );
};

export default PostPage;
