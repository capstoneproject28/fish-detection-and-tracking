import React, { useEffect } from 'react';
import "./css/signup.css"
export default function SignInSignUp() {
  useEffect(() => {
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }, []);

  return (
    <>
      <div className="cont">
        <div className="form sign-in">
          <h2>Welcome back,</h2>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="button" className="submit">
            Sign In
          </button>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and see beyond the surface with AquaViSion!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>If you already have an account, just sign in. We've missed you!</p>
            </div>
            <div className="img__btn">
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up">
          <h2>Welcome to AquaVision</h2>
          <br></br>
					<p>See Beyond the Surface with Aquavision: Precision Fish Tracking and Analysis.</p>
            <label>
              <span>Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <button type="button" className="submit">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}