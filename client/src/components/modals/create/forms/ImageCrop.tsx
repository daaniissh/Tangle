
import React, { useState } from 'react'
import { FormProps } from '../types'
import Cropper from 'react-easy-crop'


const ImageCrop = ({ formsState, onSubmit, gotoForm }: FormProps) => {
  const [crop, setCrop] = useState<object>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedArea, setCroppedArea] = useState(null)

  const [aspectRatio, setAspectRatio] = useState(9 / 16)
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels)
  }
  const image = formsState.SelectImage.image


  const onAspectRationChange = (event: any) => {
    setAspectRatio(event.target.value)
  }
  const onCropDone = (imgCroppedArea: any) => {
    // Create a canvas element to crop the image
    const canvasEle: HTMLCanvasElement = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    // Load the selected image
    let imageObj1: HTMLImageElement = new Image();
    imageObj1.src = formsState.SelectImage.image as string;
    imageObj1.onload = function () {
      // Draw the cropped portion of the image onto the canvas
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataUrl = canvasEle.toDataURL("image/jpeg")
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
      const file = new Blob([uintArray], { type: mimeString });

      // Create a File object (optional, but can be useful)
      const finalFile = new File([file], "cropped-image.jpg", { type: mimeString });
      onSubmit({ image: dataUrl, file: finalFile })

      gotoForm("UploadPost")
    };

  }
  return (
    <div className=' h-[600px] flex justify-center items-end rounded-lg' >


      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatio}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        style={{
          containerStyle: {
            width: '100%',
            height: '90%',
            backgroundColor: "#000"
          }
        }}
      />

      <div className="flex flex-wrap w-full px-1 gap-4 items-center z-50 justify-between">
        <div className=""></div>
        <div className="text-white flex gap-2 text-base font-bold" onChange={onAspectRationChange}>
          <input type="radio" value={1 / 1} name="ratio" /> 1:1
          <input type="radio" value={4 / 5} name="ratio" /> 4:5
          <input type="radio" value={9 / 16} name="ratio" /> 9:16

        </div>
        <button onClick={() => onCropDone(croppedArea)} className='font-bold text-insta-link' >Next</button>

      </div>
    </div>

  )
}

export default ImageCrop