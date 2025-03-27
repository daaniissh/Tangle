

const ProgressLoader = () => {
  return (
    <div className="absolute w-full z-50 flex flex-col justify-center items-center bg-black dark:bg-black text-white">
      {/* Absolute positioned loader at the top */}
      <div className="absolute top-0 left-0 w-full">
        <div className="w-full h-[4px] bg-gray-700  overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-yellow-500 to-red-500 animate-gradient"></div>
        </div>
      </div>

    </div>
  )
}

export default ProgressLoader