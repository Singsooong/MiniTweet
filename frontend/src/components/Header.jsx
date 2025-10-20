import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { authAPI } from "../services/authServices";

const Header = () => {
  const userAvatar = "https://via.placeholder.com/150/0000FF/808080?text=U";
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;

    try {
      await authAPI.logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side: Logo/Title */}
        <div className="flex items-center space-x-4">
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
            Feed
          </span>
          <h1 className="text-2xl font-bold ml-2">MiniTweet</h1>
        </div>

        {/* Right Side: User Menu & Logout */}
        <div className="flex items-center space-x-4">
          <Avatar src={userAvatar} alt="Current User" size="small" />

          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium hover:text-gray-300 transition duration-150"
          >
            <span className="mr-1">⏏</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
