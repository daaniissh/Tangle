
import { useNavigate } from 'react-router-dom';

const PageNotAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-screen  dark:bg-black dark:text-white">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Sorry, this page isn't available.
        </h1>
        <p className="mt-4 text-sm md:text-base">
          The link you followed may be broken, or the page may have been removed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default PageNotAvailable;
