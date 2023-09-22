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
          let token = response.data;
          localStorage.setItem("uid", token.token);
          localStorage.setItem("username", token.username);
          console.log(token.token);
          if (token !== undefined || null) {
            //Navigate to the Detection Page
            navigate("/detect");
            window.location.reload();

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

    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
            <span className="h1 fw-bold mb-0">Fish Detector</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px', color: 'yellow' }}>Login Page</h3>

            {/*       <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" />
 */}
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
            </FloatingLabel>


            <Button onClick={SignIn} className="mb-4 px-5 mx-5 w-100" variant="primary" size="lg">
              Login
            </Button>
            <p className='ms-5'>Don't have an account? <a href="/register" class="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://miro.medium.com/v2/da:true/resize:fit:640/1*ob6aGoKcnAwwk3UruVSCkA.gif"
            alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>


  );



}

export default SignInPage;




{/* <div>
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
        </div>
      </div>
    </div>
 */}

