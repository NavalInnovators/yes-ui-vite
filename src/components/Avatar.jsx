// src/components/Avatar.jsx
import React from "react";

const Avatar = ({ src, size = 60 }) => {
  return (
    <img
      src={src}
      alt="User Avatar"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;
