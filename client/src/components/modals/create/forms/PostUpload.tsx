import React, { useState } from 'react'
import { FormProps } from '../types'
import UserAvatar from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/types/QueryKey/key'
import SpinnerIcon from '@/components/loaders/LoadingSpinner'
import { AuthUser } from '@/types/QueryTypes/queary'


const PostUpload = ({ formsState, onSubmit, setIsOpen, gotoForm }: FormProps) => {
  const [caption, setCaption] = useState<string>("")
  const getCaption = (e: React.FormEvent<HTMLDivElement>) => {

    setCaption(e.currentTarget.textContent || "");
  };

  const APIURL = import.meta.env.VITE_API_URL;

  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] as QueryKey });
  const queryClient = useQueryClient();

  const { mutate: CreatePost, isPending } = useMutation({
    mutationFn: async ({ image, caption }: { image: string, caption: string }) => {
      try {
        const res = await fetch(`${APIURL}/posts/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: caption, img: image }),
          credentials: 'include',
        })
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;

      } catch (error) {
        console.log(error)

      }
    },
    onSuccess: () => {
      // setText("");
      // setImg(null);
      // toast.success("Post created successfully");
      setIsOpen(false)
      gotoForm('SelectImage')
      queryClient.invalidateQueries({ queryKey: ["posts"] as QueryKey });
    },
  })
  const { mutate: createStory ,isPending:isStory} = useMutation({
    mutationFn: async ({ image, caption }: { image: string, caption: string }) => {
      try {
        const res = await fetch(`${APIURL}/posts/story`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: caption, img: image }),
          credentials: 'include',
        })
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;

      } catch (error) {
        console.log(error)

      }
    },
    onSuccess: () => {
      // setText("");
      // setImg(null);
      // toast.success("Post created successfully");
      setIsOpen(false)
      gotoForm('SelectImage')
      queryClient.invalidateQueries({ queryKey: ["posts"] as QueryKey });
    },
  })


  const SharePost = () => {

    CreatePost({
      caption,
      image: formsState?.CropImage?.image as string
    });

    onSubmit({ caption, image: formsState.CropImage.image as string, file: formsState.CropImage.file });




  };
  const ShareStory = () => {

    createStory({
      caption,
      image: formsState?.CropImage?.image as string
    });

    onSubmit({ caption, image: formsState.CropImage.image as string, file: formsState.CropImage.file });




  };
  return (
    <div className="flex  items-center h-[600px]">
      <div className="flex flex-col md:flex-row gap-2 w-full h-full">

        <div className="bg-[#262626]  md:mt-8  overflow-hidden">
          <img
            className="w-full md:w-auto h-full object-contain"
            src={formsState.CropImage.image as string}
            alt="Cropped Image"
          />
        </div>
        {/* right */}
        <div className="flex-1 px-2   flex flex-col">
          <div className="text-white flex-1  flex justify- flex-col mt-5 md:mt-8 ">

            <div className="py-2"><UserAvatar image={authUser?.profileImg} username={authUser?.username} className='text-sm' /></div>
            <div
              aria-label="Write a caption..."
              className="w-full h-52   outline-none dark:text-white text-stone-800 py-2 px-5 bg-gray-200 dark:bg-[#121212] rounded-xl placeholder:text-white editable-placeholder"

              contentEditable="true"
              role="textbox"
              onInput={getCaption}
              spellCheck="true"
              // tabIndex="0"
              aria-placeholder="Write a caption..."
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                minHeight: "150px",
                position: "relative",
              }}
            >
              <p style={{ marginTop: "0" }}>
                <br />
              </p>
            </div>

          </div>
          <div className="mt-5 flex gap-2">
            <Button onClick={ShareStory} className='!bg-green-600 !text-white w-full' >{isStory ? <SpinnerIcon /> : "Story"}</Button>
            <Button onClick={SharePost} className='!bg-insta-primary !text-white w-full' >{isPending ? <SpinnerIcon /> : "Post"}</Button>
          </div>

        </div>

      </div>

    </div>

  )
}

export default PostUpload