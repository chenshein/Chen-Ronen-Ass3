import React, { useEffect } from "react";
import loginImg from "../../../assets/loginImg.js";
import signUpImg from "../../../assets/signUpImg.js";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import "./LoginSignupPage.css";

function LoginSignupPage({ handleUserChange }) {
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container.loginSignUp");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }, []);

  return (
    
      <div className="fluid container loginSignUp">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <Login handleUserChange={handleUserChange}></Login>
            </form>

            <form action="#" className="sign-up-form">
              <SignUp></SignUp>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Press here to sign up</p>
              <button className="btn loginSignUp transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={signUpImg.image} className="image" alt="" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>Already registered?</h3>
              <p>Press here to login</p>
              <button className="btn loginSignUp transparent" id="sign-in-btn">
                Login
              </button>
            </div>
            <img src={loginImg.image} className="image" alt="" />
          </div>
        </div>
      </div>
  );
}

export default LoginSignupPage;
