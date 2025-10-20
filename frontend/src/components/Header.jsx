import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { authAPI } from "../services/authServices";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userAvatar = `https://ui-avatars.com/api/?name=${user?.user?.firstname}&background=random`;

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
  console.log(user);
  return (
    <header className=" text-black">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side: Logo/Title */}
        <div className="flex items-center space-x-4">
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
