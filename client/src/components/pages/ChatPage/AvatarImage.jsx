import React from "react";
import defaultAvatar from "../../../assets/default-avatar.png";

export const AvatarImage = ({
  src = defaultAvatar,
  width = "50px",
  height = "50px",
  alt = "",
  style,
}) => {
  return (
    <>
      <img
        className="rounded-circle avatar__image"
        src={src === null ? defaultAvatar : src}
        width={width}
        height={height}
        alt={alt}
        style={style}
      />
    </>
  );
};
