import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface UserProfileFormData {
  fullName?: string;
  username?: string;
  email?: string;
  link?: string;
  bio?: string;
  currentPassword?: string,
  newPassword?: string,
  profileImg?: string
}
const useUpdateUserProfile = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const APIURL = import.meta.env.VITE_API_URL;

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: async (formData: UserProfileFormData) => {
      try {
        const res = await fetch(`${APIURL}/users/update`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {

      }
    },
    onSuccess: (data) => {
    navigate(-1)
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["profile"] }),
      ]);
    },
    onError: (error) => {
      console.log(error.message,"==error")

    },
  });

  return { updateProfile, isUpdatingProfile};
};

export default useUpdateUserProfile;