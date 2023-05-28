// import Contact from "../userDetails/Contact";
import React, { useState } from "react";
import { ContactsList } from "../../../dataStructure/contact/contactList.js";
import { useNavigate } from "react-router-dom";

function Login({ handleUserChange }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const nav = useNavigate();

  async function handleLogin(e) {
    if (ContactsList.findContactByIdIgnoreCase(username)) {
      const storedPassword =
        ContactsList.findContactByIdIgnoreCase(username).password;
      if (storedPassword === password) {
        handleUserChange(ContactsList.findContactByIdIgnoreCase(username));

        const data = {
          username: username,
          password: password
        };
        try {
          const response = await fetch('http://localhost:5000/api/Tokens', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch token');
          }
          //gets token
          const jason = await response.text();

          console.log(jason);

          try {
            const res = await fetch(`http://localhost:5000/api/Users/${username}`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + jason,
                'Content-Type': 'application/json'
              },
            });

            if (!res.ok) {
              throw new Error('Failed to fetch token');
            }

            const jason2 = await res.text();
            console.log("details:", jason2);
          } catch (error) {
            console.error('Error creating token:', error);
          }


          setLoginStatus("Login successful");
          e.preventDefault();
          nav("/chat");

        } catch (error) {
          console.error('Error creating token:', error);
        }


        // setLoginStatus("Login successful");
        // e.preventDefault();
        // nav("/chat");
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
