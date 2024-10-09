import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center">
        {/* Funny emoji with Tailwind CSS for animation */}
        <div className="text-6xl mb-4 animate-bounce">😂</div>

        <p className="text-lg font-semibold text-white mb-2">
          Loading your memes...
        </p>
        <p className="text-md text-gray-300">
          Don't worry, they'll be worth the wait! 😄
        </p>
      </div>
    </div>
  );
};

export default Loading;