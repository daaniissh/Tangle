import ExplorePost from '@/components/common/SmallPost'


const Explore = () => {
  return (
<div className="flex justify-center w-full min-h-screen overflow-y-scroll h-screen scrollbar-thin dark:scrollbar-track-black scrollbar-thumb-white dark:scrollbar-thumb-gray-800 mb-20 md:mb-0">
  <div className="w-full px-2 mt-10  md:px-5 max-w-5xl">
    <div className="grid gap-1 grid-cols-3 auto-rows-fr ">
      <ExplorePost comments='144' img='https://i.pinimg.com/564x/4b/b3/c9/4bb3c97b54b93dcae6580aeadbe54a1d.jpg' likes='12.4k' />
      <ExplorePost comments='144' img='https://i.pinimg.com/736x/34/ab/7b/34ab7b5a86415959d0585a199392b396.jpg' likes='12.4k' />
    
    </div>
  </div>
</div>

  
  )
}

export default Explore