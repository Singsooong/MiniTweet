import React from "react";

const Avatar = ({ src, alt = "User Avatar", size = "default" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
  }[size];

  return (
    <img
      className={`rounded-full object-cover ${sizeClasses}`}
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
