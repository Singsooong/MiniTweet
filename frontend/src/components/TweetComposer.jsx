import React, { use, useState } from "react";
import Avatar from "./Avatar";
import { tweetAPI } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
const TweetComposer = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const composerAvatar = `https://ui-avatars.com/api/?name=${user?.firstname}&background=random`;

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    try {
      const response = await tweetAPI.createTweet({ content });

      console.log("Tweet response:", response.data);

      if (response.data.success && response.data.tweet) {
        onPost(response.data.tweet);
        setContent("");
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error posting tweet:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-4 rounded-3xl shadow-md mb-6">
      <div className="flex space-x-3 items-start">
        <Avatar src={composerAvatar} alt="Composer Avatar" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-25 text-md resize-none outline-none placeholder-gray-500 bg-gray-200 rounded-md py-3 px-4"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between items-center pt-3">
        <p className="text-xs text-gray-500 mr-4">
          {250 - content.length} characters remaining
        </p>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center px-4 py-2 bg-black text-white font-semibold text-sm rounded-full hover:bg-gray-800 transition duration-150 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {/* Paper plane icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2z"
            />
          </svg>

          {/* Button text */}
          {loading ? "Posting..." : "Tweet"}
        </button>
      </div>
    </div>
  );
};

export default TweetComposer;
