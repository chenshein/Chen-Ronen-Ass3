import React, { useState, useEffect } from 'react';
import './photoUpload.css';

function PhotoUpload(props) {
  const [curPhoto, setPhoto] = useState(null);
  const [photoStatus, setPhotoStatus] = useState('');

  const handlePhotoUpload = (event) => {
    const uploadedPhoto = event.target.files[0];
    const imageType = /^image\//;

    if (uploadedPhoto != null) {
      if (imageType.test(uploadedPhoto.type)) {
        const newPhotoUrl = URL.createObjectURL(uploadedPhoto);
        setPhoto(newPhotoUrl);
        setPhotoStatus('');

      } else {
        setPhoto(null);
        setPhotoStatus('Invalid photo');
        
      }
    }
    
  };

  useEffect(() => {
    props.onPhotoChange(curPhoto);
  }, [curPhoto]);

  
  return (
    <>
    <div className="upload-container">
      <label htmlFor="file-upload" className="upload-label">
        <img id="upload-image" src={curPhoto || require('./uploadPhoto.png')} alt="Upload Photo" className="upload-icon" />
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
