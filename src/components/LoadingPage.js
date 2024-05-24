import { useEffect, useState } from 'react';

export default function LoadingPage () {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="fixed top-0 left-0 flex flex-col bg-white opacity-80 w-full h-full items-center justify-center">
      <p className="text-lg text-black font-black">Please wait{dots}</p>
    </div>
  );
};