import React, { useState, useEffect } from "react";
import "./photoUpload.css";

function PhotoUpload(props) {
  const [curPhoto, setPhoto] = useState(null);
  const [photoStatus, setPhotoStatus] = useState("");

  const handlePhotoUpload = async (event) => {
    const uploadedPhoto = event.target.files[0];
    const imageType = /^image\//;

    if (uploadedPhoto != null) {
      if (imageType.test(uploadedPhoto.type)) {
        const newPhotoUrl = URL.createObjectURL(uploadedPhoto);
        const base64String = await imageUrlToBase64(newPhotoUrl);
        setPhoto(base64String);
        setPhotoStatus("");
      } else {
        setPhoto(null);
        setPhotoStatus("Invalid photo");
      }
    }
  };

  const imageUrlToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        const base64String = canvas.toDataURL();
        resolve(base64String);
      };
      image.onerror = function () {
        reject(new Error("Failed to load image"));
      };
      image.src = url;
    });
  };

  useEffect(() => {
    props.onPhotoChange(curPhoto);
    console.log("curPhoto: ", curPhoto);
  }, [curPhoto]);

  return (
    <>
      <div className="upload-container">
        <label htmlFor="file-upload" className="upload-label">
          <img
            id="upload-image"
            src={curPhoto || require("./uploadPhoto.png")}
            alt="Upload Photo"
            className="upload-icon"
          />
        </label>

        <input
          id="file-upload"
          type="file"
          className="upload-input"
          onChange={handlePhotoUpload}
        />
      </div>

      {photoStatus && <p className="error-message">{photoStatus}</p>}
    </>
  );
}

export default PhotoUpload;
