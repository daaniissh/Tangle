import { useMutation, useQueryClient } from "@tanstack/react-query";


const useFollow = () => {
	const queryClient = useQueryClient();
  const APIURL = import.meta.env.VITE_API_URL;

	const { mutate: follow, isPending:isFollowing,data:followData } = useMutation({
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
				return data;
			} catch (error) {
				
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["suggested"] }),
				queryClient.invalidateQueries({ queryKey: ["following"] }),
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
			]);
		},
		onError: (error) => {
			
		},
	});

	return { follow, isFollowing ,followData};
};

export default useFollow;