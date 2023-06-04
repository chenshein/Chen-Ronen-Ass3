import React, { useState } from "react";
import { ContactsList } from "../../../dataStructure/contact/contactList.js";
import { Contacts } from "../../../dataStructure/contact/contact.js";
import PhotoUpload from "../../../photoUpload/PhotoUpload.js";
import Photo from "../../../photoUpload/uploadPhoto.png";

function SignUp() {
  const [curPhoto, setCurPhoto] = useState(null);

  function handlePhotoChange(photo) {
    setCurPhoto(photo);
  }

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isConTouched, setIsConTouched] = useState(false);

  // at least 8 characters long and contains at least one letter and one number
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;
  const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
  const displayPattern = /^[a-zA-Z0-9_\-][a-zA-Z0-9_\- ]{1,14}[a-zA-Z0-9_\-]$/;
  const [username, setUsername] = useState("");
  const [isUserValid, setIsUserValid] = useState(false);
  const [isUserTouched, setIsUserTouched] = useState(false);

  const [displayUsername, setDisplayUsername] = useState("");
  const [isDisplayUserValid, setIsDisplayUserValid] = useState(false);
  const [isDisplayUserTouched, setIsDisplayUserTouched] = useState(false);

  // username- check if match regex
  function handleUsernameChange(event) {
    const value = event.target.value;
    setUsername(value);
    setIsUserValid(usernamePattern.test(value));
    setIsUserTouched(true);
  }

  // display username- check if match regex
  function handleDisplayUsernameChange(event) {
    const value = event.target.value;
    setDisplayUsername(value);
    setIsDisplayUserValid(displayPattern.test(value));
    setIsDisplayUserTouched(true);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
    setIsPwdValid(passwordPattern.test(value));
    setIsMatch(confirmPassword === value);
  }

  function handleConfirmPasswordChange(event) {
    const value = event.target.value;
    setConfirmPassword(value);
    setIsMatch(password === value);
  }

  // function addContact() {
  //   if (isPwdValid && isUserValid && isMatch && isDisplayUserValid) {
  //     const existingContact = ContactsList.findContactByIdIgnoreCase(username);
  //
  //     if (existingContact) {
  //
  //       const messageElement = document.getElementById("message");
  //       messageElement.textContent = "Username already exists";
  //       // Reset the message after a certain duration (e.g., 3 seconds)
  //       setTimeout(() => {
  //         messageElement.textContent = "";
  //       }, 3000);
  //       return false;
  //     }
  //
  //     return true;
  //   }
  // }



  // function imageUrlToBase64(url) {
  //   return new Promise((resolve, reject) => {
  //     fetch(url)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         var reader = new FileReader();
  //         reader.onloadend = function () {
  //           var base64String = reader.result;
  //           resolve(base64String);
  //         };
  //         reader.readAsDataURL(blob);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }



  async function handleSubmit(e) {
    e.preventDefault();
    const v1 = usernamePattern.test(username);
    const v2 = passwordPattern.test(password);
    const v3 = displayPattern.test(displayUsername);
    if (!v1 || !v2 || !v3) {
      return;
    }

    let imgBase64 = null;
    e.preventDefault();
    const signupInputImg = document.getElementById("file-upload");
    const signupImg = document.getElementById("upload-image");
    if (signupInputImg) {
      signupImg.src = Photo;
      signupInputImg.value = "";
    }

    // let imageUrl = { curPhoto };
    // try {
    //   imgBase64 = await imageUrlToBase64(imageUrl);
    // } catch (error) {
    //   console.error("Error converting image to base64:", error);
    // }

    try {
      const data = {
        username: username,
        password: password,
        displayName: displayUsername,
        profilePic: curPhoto,
      };
      const response = await fetch("http://localhost:5000/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("RES:" +response)
      if (!response.ok) {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "Username already exists";
        // Reset the message after a certain duration (e.g., 3 seconds)
        setTimeout(() => {
          messageElement.textContent = "";
        }, 3000);
      } else {
        const container = document.querySelector(".container.loginSignUp");
        container.classList.remove("sign-up-mode");
        setUsername("");
        setIsUserValid(false);
        setIsUserTouched(false);
        setPassword("");
        setConfirmPassword("");
        setPasswordTouched(false);
        setIsPwdValid(false);
        setIsMatch(false);
        setIsConTouched(false);
        setDisplayUsername("");
        setIsDisplayUserValid(false);
        setIsDisplayUserTouched(false);
        setCurPhoto(null);
      }
      // console.log(JSON.stringify(data));
    } catch (e) {
      console.error("Error creating user testttt:", e);
    }
  }


  return (
      <>
        <h2 className="title">Sign up</h2>
        <PhotoUpload onPhotoChange={handlePhotoChange}></PhotoUpload>

        <div className="row logSignup-container">
          <div className="logSignup-container__input d-inline-flex justify-content-center align-items-center">
            <input
                type="text"
                className={`logSignup form-control ${
                    isUserTouched ? (isUserValid ? "is-valid" : "is-invalid") : ""
                }`}
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => setIsUserTouched(true)}
                required
            />
            <div
                className="input-group-text"
                data-tooltip="Please enter at least 3 characters, and at most 16."
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={20}
                  height={20}
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
            </div>
          </div>
          {isUserTouched && !isUserValid && (
              <div className="invalid-feedback">
                Please use only alphanumeric characters
              </div>
          )}
        </div>

        <div className="row logSignup-container">
          <div className="logSignup-container__input d-inline-flex justify-content-center align-items-center">
            <input
                type="password"
                className={`logSignup form-control ${
                    passwordTouched ? (isPwdValid ? "is-valid" : "is-invalid") : ""
                }`}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setPasswordTouched(true)}
                required
            />
            <div
                className="input-group-text"
                data-tooltip="Enter at least 8 characters that contains at least one letter and one number."
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={20}
                  height={20}
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
            </div>
          </div>
          {passwordTouched && !isPwdValid && (
              <div className="invalid-feedback">Invalid password</div>
          )}
        </div>
        <div className="row logSignup-container">
          <div className="logSignup-container__input d-inline-flex justify-content-center align-items-center">
            <input
                type="password"
                className={`logSignup form-control ${
                    isConTouched ? (isMatch ? "is-valid" : "is-invalid") : ""
                }`}
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => setIsConTouched(true)}
                required
            />{" "}
          </div>

          {isConTouched && !isMatch && (
              <div className="invalid-feedback">Passwords do not match</div>
          )}
        </div>

        <div className="row logSignup-container">
          <div className="logSignup-container__input d-inline-flex justify-content-center align-items-center">
            <input
                type="text"
                className={`logSignup form-control ${
                    isDisplayUserTouched
                        ? isDisplayUserValid
                            ? "is-valid"
                            : "is-invalid"
                        : ""
                }`}
                id="username"
                name="username"
                placeholder="Display name"
                value={displayUsername}
                onChange={handleDisplayUsernameChange}
                onBlur={() => setIsDisplayUserTouched(true)}
                required
            />{" "}
            <div
                className="input-group-text"
                data-tooltip="Please enter at least 3 characters, and at most 16."
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={20}
                  height={20}
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
            </div>
          </div>
          {isDisplayUserTouched && !isDisplayUserValid && (
              <div className="invalid-feedback">
                Please use only alphanumeric characters
              </div>
          )}
        </div>
        <button
            className="btn loginSignUp solid"
            onClick={handleSubmit}
            disabled={
              !isUserValid || !isPwdValid || !isMatch || !isDisplayUserValid
                  ? true
                  : false
            }
        >
          Sign Up
        </button>
        <div id="message"></div>
      </>
  );
}

export default SignUp;
