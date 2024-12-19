"use client";

const Card2 = () => {
  return (
    <div className="relative w-[300px] h-[250px] sm:w-[700px] sm:h-[150px] rounded-md p-[1px] bg-[radial-gradient(circle_230px_at_0%_0%,_#ffffff,_#0c0d0d)]">
      <div className="absolute w-[5px] aspect-square bg-white rounded-full shadow-[0_0_10px_#ffffff] z-20 top-[10%] right-[10%] animate-move-dot" />

      <div className="relative flex flex-col items-center justify-center w-full h-full bg-[radial-gradient(circle_280px_at_0%_0%,_#444444,_#0c0d0d)] rounded-md border border-[#202222] text-white">
        <div className="absolute w-[220px] sm:w-[400px] h-[45px] bg-gray-300 rounded-full opacity-40 shadow-[0_0_50px_#fff] blur-[10px] top-0 left-0 transform origin-[10%] rotate-40" />

        <div className="text-transparent bg-clip-text bg-gradient-to-r from-black via-white to-black font-bold text-4xl">
          750k
        </div>
        <div>Views</div>

        <div className="absolute w-full h-[1px] bg-gradient-to-r from-gray-500 to-[#1d1f1f] top-[10%]" />
        <div className="absolute w-full h-[1px] bg-[#2c2c2c] bottom-[10%]" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-gray-500 to-[#222424] left-[10%]" />
        <div className="absolute h-full w-[1px] bg-[#2c2c2c] right-[10%]" />
      </div>
    </div>
  );
};

export default Card2;
