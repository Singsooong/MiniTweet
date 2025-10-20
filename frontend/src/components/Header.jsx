import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";
import FullPageLoader from "./FullPageLoader";

const Header = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const userAvatar = `https://ui-avatars.com/api/?name=${user?.firstname}&background=random`;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <>
      <FullPageLoader loading={loading} />
      <header className=" text-black">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo/Title */}

          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold ml-2">
              MiniTweet {user?.user?.firstname}
            </h1>
          </div>

          {/* Right Side: User Menu & Logout */}
          <div className="flex items-center space-x-4">
            <Avatar src={userAvatar} alt="Current User" />

            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-semibold hover:text-gray-300 transition duration-150 cursor-pointer"
            >
              <span className="mr-1">⏏</span>
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
