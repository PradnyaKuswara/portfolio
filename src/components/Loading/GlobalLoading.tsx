import React from 'react';
// import { Controls, Player } from '@lottiefiles/react-lottie-player';
import useGlobalLoading from '../../hooks/useGlobalLoading';

const GlobalLoading: React.FC = () => {
  const [loading] = useGlobalLoading();

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 ">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : null}
    </>
  );
};

export default GlobalLoading;
