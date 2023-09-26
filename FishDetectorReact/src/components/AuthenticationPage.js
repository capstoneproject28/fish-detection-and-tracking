import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AuthenticationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const [isSignInMode, setSignInMode] = useState(true);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("username", name);
    formData.append("password", pass);
    if (isSignInMode) {
      // SignIn Logic
      formData.append("email", email);
      axios
        .post("http://127.0.0.1:8000/api/login/", formData)
        .then((response) => {
          console.log(response.data);
          let token = response.data;
          localStorage.setItem("uid", token.token);
          localStorage.setItem("username", token.username);
          console.log(token.token);
          if (token !== undefined || null) {
            navigate("/detect");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("There was an error:", err);
        });
    } else {
      // SignUp Logic
      formData.append("email", email);
      axios
        .post("http://127.0.0.1:8000/api/register/", formData)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("There was an error:", err);
        });
    }
    setName("");
    setPass("");
    setEmail("");
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <MDBIcon
              fas
              icon="crow fa-3x me-3"
              style={{ color: "#709085" }}
            />
            <span className="h1 fw-bold mb-0">Fish Detector</span>
          </div>
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px", color: "yellow" }}
            >
              {isSignInMode ? "Login Page" : "Registration Page"}
            </h3>
            {!isSignInMode && (
              <FloatingLabel
                controlId="floatingEmail"
                label="Enter Email Address"
                className="mb-3 mx-5 w-100"
              >
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: "7px" }}
                />
              </FloatingLabel>
            )}
            <FloatingLabel
              controlId="floatingName"
              label="Enter User Name"
              className="mb-3 mx-5 w-100"
            >
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter User Name"
                onChange={(e) => setName(e.target.value)}
                style={{ marginTop: "7px" }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3 mx-5 w-100"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{ marginTop: "7px" }}
              />
            </FloatingLabel>
            <Button
              onClick={handleSubmit}
              className="mb-4 px-5 mx-5 w-100"
              variant="primary"
              size="lg"
            >
              {isSignInMode ? "Login" : "Register"}
            </Button>
            {isSignInMode ? (
              <p className="ms-5">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="link-info"
                  onClick={() => setSignInMode(false)}
                >
                  Register here
                </a>
              </p>
            ) : (
              <p className="ms-5">
                Already have an account?{" "}
                <a
                  href="#"
                  className="link-info"
                  onClick={() => setSignInMode(true)}
                >
                  Sign in
                </a>
              </p>
            )}
          </div>
        </MDBCol>
        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="https://miro.medium.com/v2/da:true/resize:fit:crop/height:600/center/0/compress:true/st/jpg:f9e009f/f54bd47b7d0bb07153ed168404c06f96/andre-benz-unsplash.jpg"
            alt="fish"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AuthenticationPage;
