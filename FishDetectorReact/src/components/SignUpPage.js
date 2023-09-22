import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';


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

    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
            <span className="h1 fw-bold mb-0">Fish Detector</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px', color: 'yellow' }}>Registration Page</h3>



            {/* <FloatingLabel
              controlId="floatingInput"
              label="Enter Email Address"
              className="mb-3 mx-5 w-100"

            >

              <Form.Control type="text"
                name="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ marginTop: "7px" }}
              />

            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Enter User Name"
              className="mb-3 mx-5 w-100"

            >
              <Form.Control type="text"
                name="name"
                value={name}
                placeholder="Enter User Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{ marginTop: "7px" }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 mx-5 w-100">
              <Form.Control type="password" placeholder="Password"
                name="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                style={{ marginTop: "7px" }}
              />
            </FloatingLabel> */}

            <input
              name="email"
              value={email}
              type="text"
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mb-3 mx-5 w-100"
            />
            <input
              name="name"
              type="text"
              value={name}
              placeholder="Enter User Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mb-3 mx-5 w-100"
            />
            <input
              name="password"
              value={pass}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              className="mb-3 mx-5 w-100"
            />


            <Button onClick={signIn} className="mb-4 px-5 mx-5 w-100" variant="primary" size="lg">
              Register
            </Button>
            <p className='ms-5'>Already have an account? <a href="/" class="link-info">Sign in</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://miro.medium.com/v2/da:true/resize:fit:640/1*ob6aGoKcnAwwk3UruVSCkA.gif"
            alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>

  );




  {/* <div>
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
    </div> */}

}

export default SignUpPage;
