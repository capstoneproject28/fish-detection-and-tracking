import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const SignIn = () => {
    if (name !== "" && pass !== "") {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("password", pass);
      axios
        .post("http://127.0.0.1:8000/api/login/", formData)
        .then((response) => {
          console.log(response.data);
          let token_key = response.data;
          const valueToSave = { token: token_key}
          console.log(token_key.token);
          if (token_key !== undefined || null) {
            //Navigate to the Detection Page
            localStorage.setItem('tokenValue', JSON.stringify(valueToSave));
            navigate("/detect");
          }
        })
        .catch((err) => {
          console.log("There was a: ", err);
        });
      setName("");
      setPass("");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <div className="auth-form">
        <div className="auth-form-content">
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Enter User Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            name="password"
            value={pass}
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button onClick={SignIn}>Login</button>
          <p>Don't have an account <a href="/register">SignUp</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
