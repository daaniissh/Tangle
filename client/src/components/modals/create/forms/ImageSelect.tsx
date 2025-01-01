import { ArrowBigRight, ArrowRight, Images } from "lucide-react";
import React, { useRef, useState } from "react";
import { FormProps, FormSubmitData } from "../types";


const ImageSelect = ({ onSubmit, gotoForm }: FormProps) => {
  const [img, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoader(true)
    const file = e.target.files?.[0];


    if (file) {
      setImage(file);
      onSubmit({ image: file })
      const reader = new FileReader();
      reader.onloadend = () => {
        onSubmit({ image: reader.result as string })
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    console.log(imagePreview)

    setLoader(false)
    gotoForm("CropImage")

  };



  let inpRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

  const handleClick = () => {
    inpRef.current?.click();

  };

  return (
    <div className="flex flex-col items-center   justify-center p-4 space-y-4">
      {/* Image Preview */}
      <div className="flex flex-col gap-4 justify-center items-center text-white  h-96 md:w-auto   rounded-md">
      <Images strokeWidth={1} className="size-20" />
        <h2 className="text-xl font-normal" >Drag photos  here</h2>
        <div className="flex gap-4">
          <button
            onClick={handleClick}
            disabled={loader}
            className="px-4 py-1 bg-insta-link text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loader ? "loading.." : " Select from computer"}
          </button>


        </div>
      </div>

      {/* Custom file upload button */}

      {/* Hidden file input */}
      <input
        ref={inpRef}
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Optional: display selected file name */}
      {img && <span className="text-sm text-gray-700">{img.name}</span>}
    </div>
  );
};

export default ImageSelect;
