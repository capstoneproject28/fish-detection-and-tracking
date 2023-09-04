import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signIn = () => {
    if (name !== "" && pass !== "" && email !== "") {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("email", email);
      formData.append("password", pass);
      axios
        .post("http://127.0.0.1:8000/api/register/", formData)
        .then((response) => {
          console.log(response.data);
          if (response !== null || "" || undefined) {
            //Navigate to Login Page
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("There was a: ", err);
        });
      setName("");
      setPass("");
      setEmail("");
    }
  };
  return (
    <div>
      <h1>Create Your Account</h1>
      <div className="auth-form">
        <div className="auth-form-content">
          <input
            name="email"
            value={email}
            type="text"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
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
          <button onClick={signIn}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
