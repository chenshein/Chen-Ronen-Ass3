// import Contact from "../userDetails/Contact";
import React, { useState } from "react";
import { ContactsList } from "../../../dataStructure/contact/contactList.js";
import { useNavigate } from "react-router-dom";

function Login({ handleUserChange }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const nav = useNavigate();

  function handleLogin(e) {
    if (ContactsList.findContactByIdIgnoreCase(username)) {
      const storedPassword =
        ContactsList.findContactByIdIgnoreCase(username).password;
      if (storedPassword === password) {
        handleUserChange(ContactsList.findContactByIdIgnoreCase(username));

        setLoginStatus("Login successful");
        e.preventDefault();
        nav("/chat");
      } else {
        setLoginStatus("Invalid password");
        e.preventDefault();
      }
    } else {
      setLoginStatus("Invalid username");
      e.preventDefault();
    }
  }

  function handleUsernameChange(event) {
    const value = event.target.value;
    setUsername(value);
    setLoginStatus("");
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
    setLoginStatus("");
  }

  return (
    <div>
      <h2 className="title">Login</h2>
      <div className="row logSignup-container login">
        <i className="fas fa-user"></i>
        <div className="logSignup-container__input d-inline-flex justify-content-center align-items-center">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={`logSignup form-control`}
            placeholder="Username"
            required
          />
        </div>
      </div>

      <div className="row logSignup-container login">
        <i className="fas fa-user"></i>
        <div className="logSignup-container__input d-inline-flex justify-content-center align-items-center">
          <input
            value={password}
            type="password"
            onChange={handlePasswordChange}
            className={`logSignup form-control`}
            placeholder="Password"
            required
          />
        </div>
      </div>
      <input
        type="submit"
        value="Login"
        className="btn loginSignUp solid"
        onClick={handleLogin}
      />

      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
}

export default Login;
