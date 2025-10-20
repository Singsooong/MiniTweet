import React from "react";
import Avatar from "./Avatar";

const Header = () => {
  const userAvatar = "https://via.placeholder.com/150/0000FF/808080?text=U";

  return (
    <header>
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side: Logo/Title */}
        <div className="flex items-center space-x-4">
          <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-70">
            Feed
          </span>
          <h1 className="text-2xl font-bold ml-2">MiniTweet</h1>
        </div>

        {/* Right Side: User Menu & Logout */}
        <div className="flex items-center space-x-4 ">
          <Avatar src={userAvatar} alt="Current User" size="small" />

          <button className="flex items-center text-sm font-medium hover:text-gray-300 transition duration-150">
            {/* Using a simple icon or text placeholder for Logout icon */}
            <span className="mr-1">⏏</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
