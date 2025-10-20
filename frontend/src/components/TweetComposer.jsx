import React from "react";
import Avatar from "./Avatar";

const TweetComposer = () => {
  const composerAvatar = "https://via.placeholder.com/150/0000FF/808080?text=U";

  return (
    <div className="bg-white p-4 rounded-3xl shadow-md mb-6">
      <div className="flex space-x-3 items-start">
        <Avatar src={composerAvatar} alt="Composer Avatar" />

        {/* Input Area */}
        <div className="flex-1">
          <textarea
            className="w-full h-25 text-md resize-none outline-none placeholder-gray-500 bg-gray-200 rounded-md py-3 px-4"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>

      {/* Footer / Action Bar */}
      <div className="flex justify-between items-center pt-3 ">
        <p className="text-xs text-gray-500 mr-4">250 haracters remaining</p>
        <button className="px-4 py-2 bg-black text-white font-semibold text-sm rounded-full hover:bg-gray-800 transition duration-150">
          Tweet
        </button>
      </div>
    </div>
  );
};

export default TweetComposer;
