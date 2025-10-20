import React, { useState } from "react";
import Avatar from "./Avatar";

const TweetComposer = () => {
  const composerAvatar = "https://via.placeholder.com/150/0000FF/808080?text=U";
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optional: include token if your Laravel API is protected
          // "Authorization": `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      // If your Laravel API returns the created tweet
      if (data.success && data.tweet) {
        onPost(data.tweet);
        setContent("");
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error posting tweet:", error);
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
          className={`px-4 py-2 bg-black text-white font-semibold text-sm rounded-full hover:bg-gray-800 transition duration-150 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Tweet"}
        </button>
      </div>
    </div>
  );
};

export default TweetComposer;
