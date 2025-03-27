import { Heart } from 'lucide-react'


const LikeHeart = () => {
  return (
    <div className="absolute select-none top-0 m-auto flex justify-center animate-shakeAndHide items-center h-full w-full">
      <Heart className="size-36 fill-rose-600 text-rose-600" />
    </div>
    )
}

export default LikeHeart