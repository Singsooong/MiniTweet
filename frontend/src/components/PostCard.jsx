import React, { useState } from "react";
import Avatar from "./Avatar";
import { tweetAPI } from "../services/authServices";
import { format } from "timeago.js";
import Heart from "./Heart";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(post.liked_by_user || false);

  const username = post.owner?.firstname || "Unknown";
  const time = format(post.created_at);
  const content = post.content;
  const avatarSrc = `https://ui-avatars.com/api/?name=${username}&background=random`;

  const handleLike = () => {
    // Optimistic UI update
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    // Fire-and-forget API call
    tweetAPI
      .likeTweet(post.id)
      .then((response) => {
        if (response.data.success) {
          setLiked(response.data.liked);
          setLikes(response.data.likes);
        }
      })
      .catch((err) => {
        console.error("Error liking tweet:", err);
        // revert if API fails
        setLiked((prev) => !prev);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
      });
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

      <div className="flex items-center mt-3 space-x-2">
        {<Heart isActive={liked} onClick={handleLike} animationScale={1.25} />}
        <span
          className={`text-sm ${
            liked ? "text-red-600 font-medium" : "text-gray-600"
          }`}
        >
          {likes}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
