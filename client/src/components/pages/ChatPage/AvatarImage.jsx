import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../assets/default-avatar.png";

export const AvatarImage = ({
  src = defaultAvatar,
  width = "50px",
  height = "50px",
  alt = "",
  style,
}) => {
  const [imageSrc, setImageSrc] = useState(defaultAvatar);

  useEffect(() => {
    const loadImage = async () => {
      const isBase64Image = await isBase64UrlImage(src);
      setImageSrc(isBase64Image ? src : defaultAvatar);
    };

    loadImage();
  }, [src]);

  const isBase64UrlImage = async (base64String) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = base64String;
      image.onload = function () {
        if (image.height === 0 || image.width === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      image.onerror = () => {
        resolve(false);
      };
    });
  };

  return (
    <>
      <img
        className="rounded-circle avatar__image"
        src={imageSrc}
        width={width}
        height={height}
        alt={alt}
        style={style}
      />
    </>
  );
};
