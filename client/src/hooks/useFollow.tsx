import { AuthUser } from "@/types/QueryTypes/queary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client"; // Import Socket type if needed

const useFollow = (socket?: Socket | null) => {
	console.log(socket)
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const APIURL = import.meta.env.VITE_API_URL;

  const { mutate: follow, isPending: isFollowing, data: followData } = useMutation({
    mutationFn: async (userId: string) => {
      try {
        const res = await fetch(`${APIURL}/users/follow/${userId}`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw error; // Ensure the error is propagated
      }
    },
    onSuccess: (data, userId) => {
      // Invalidate relevant queries
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggested"] }),
        queryClient.invalidateQueries({ queryKey: ["following"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);

      // Send notification if followData.type is undefined or "follow"
      if (data.type === undefined || data.type !== "follow") {
        socket?.emit("sendNotification", {
          from: authUser?._id, // Use the authenticated user's ID
          to: userId, // The user being followed (passed as argument)
          type: "follow",
        });
      }
    },
    onError: (error) => {
      console.error("Follow error:", error);
    },
  });

  return { follow, isFollowing, followData };
};

export default useFollow;