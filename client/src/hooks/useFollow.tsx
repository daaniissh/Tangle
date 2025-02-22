import { useMutation, useQueryClient } from "@tanstack/react-query";


const useFollow = () => {
	const queryClient = useQueryClient();
  const APIURL = import.meta.env.VITE_API_URL;

	const { mutate: follow, isPending:isFollowing } = useMutation({
		mutationFn: async (userId:string) => {
			try {
				const res = await fetch(`${APIURL}/users/follow/${userId}`, {
					method: "POST",
          credentials:"include"
				});

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return;
			} catch (error) {
				
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
			]);
		},
		onError: (error) => {
			
		},
	});

	return { follow, isFollowing };
};

export default useFollow;