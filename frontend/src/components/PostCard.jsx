// PostCard.jsx
import React from "react";
import Avatar from "./Avatar";

const PostCard = ({ post }) => {
  const { username, time, content, likes, avatarSrc } = post;

  const isLiked = likes > 30;

  return (
    <div className="bg-white py-6 px-7 rounded-3xl shadow-md  border border-gray-100">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-2">
        <Avatar src={avatarSrc} alt={username} size="default" />

        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{username}</span>
          <span className="text-gray-500 text-xs">{time}</span>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 leading-relaxed">
        {/* Simple rendering for bold text or emojis if needed */}
        {content}
      </p>

      {/* Post Footer (Likes) */}
      <div className="flex items-center mt-3">
        <button className="flex items-center space-x-1 focus:outline-none">
          {/* Heart Icon (red if liked, black border if not) */}
          <span
            className={`text-lg transition-colors duration-200 ${
              isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            role="img"
            aria-label="likes"
          >
            {isLiked ? "❤️" : "♡"}
          </span>
          <span
            className={`text-sm ${
              isLiked ? "text-red-600 font-medium" : "text-gray-600"
            }`}
          >
            {likes}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
