// PostCard.jsx
import React, { useState } from "react";
import Avatar from "./Avatar";
import { tweetAPI } from "../services/authServices";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(post.liked_by_user || false);

  const username = post.owner?.email || "Unknown";
  const time = new Date(post.created_at).toLocaleString();
  const content = post.content;
  const avatarSrc = `https://ui-avatars.com/api/?name=${username}&background=random`;

  const handleLike = async () => {
    // instant toggle
    const prevLiked = liked;
    const prevLikes = likes;

    // optimistic UI
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);

    try {
      const response = await tweetAPI.likeTweet(post.id);
      if (response.data.success) {
        // sync with real count from backend (optional)
        setLiked(response.data.liked);
        setLikes(response.data.likes);
      } else {
        // rollback if backend says no
        setLiked(prevLiked);
        setLikes(prevLikes);
      }
    } catch (error) {
      console.error("Error liking tweet:", error);
      // rollback on error
      setLiked(prevLiked);
      setLikes(prevLikes);
    }
  };

  return (
    <div className="bg-white py-6 px-7 rounded-3xl shadow-md border border-gray-100">
      <div className="flex items-center space-x-3 mb-2">
        <Avatar src={avatarSrc} alt={username} size="default" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{username}</span>
          <span className="text-gray-500 text-xs">{time}</span>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{content}</p>

      <div className="flex items-center mt-3">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 focus:outline-none transition"
        >
          <span
            className={`text-lg ${
              liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            {liked ? "❤️" : "♡"}
          </span>
          <span
            className={`text-sm ${
              liked ? "text-red-600 font-medium" : "text-gray-600"
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
