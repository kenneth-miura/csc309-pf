import React, { useState, useRef, useEffect } from "react";
import { Tab, Card, Box, Button, FormControl, Input } from "@mui/material";
import Navbar from "./Navbar";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function RegisterForm(props) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [phonenumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [formNotFilledIn, setFormNotFilledIn] = useState(false);

  useEffect(() => {
    if (password1 !== password2) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }
  })

  function handleRegister(data) {
    data.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("password", password1);
    // formData.append("password2", password2);
    formData.append("phone_number", phonenumber);
    const fileInput = document.querySelector("#avatar");
    formData.append("avatar", fileInput.files[0]);

    fetch("http://127.0.0.1:8000/accounts/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData }
      ).then((response) => {
        if (response.status === 400) {
          console.log("Error in form!");
          setFormNotFilledIn(true);
          throw new Error(response.status);
        } else {
          return response.json();
          setFormNotFilledIn(false);
        }
      }).then((data) => {
        console.log("HELLO?")
        navigate("/login")
      }).catch((error) => {
        console.log(error);

      })
    
  }

  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "white",
            width: "700px",
            height: "900px",
            marginTop: "20vh",
            marginBottom: "24vh",
          }}
        >
          <h3
            style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}
          >
            Register
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <form method="POST" onsubmit={handleRegister}> */}
              <Stack>
                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="username"
                    placeholder="Username"
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  ></Input>
                  <label>Username</label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="firstname"
                    placeholder="First Name"
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></Input>
                  <label>First Name </label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="lastname"
                    placeholder="Last Name"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></Input>
                  <label>Last Name</label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="email"
                    placeholder="Email"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                  <label>Email</label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="password1"
                    placeholder="Password"
                    type="password"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPassword1(e.target.value);
                    }}
                  ></Input>
                  <label>Password</label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                  ></Input>
                  <label>Confirm Password</label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    name="phonenumber"
                    placeholder="Phone Number"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  ></Input>
                  <label>Phone Number</label>
                </FormControl>

                <FormControl style={{ width: "300px", paddingTop: "10px" }}>
                  <Input
                    type="file"
                    id="avatar"
                    name="avatar"
                  ></Input>
                  <label>Avatar</label>
                </FormControl>
                {formNotFilledIn && (
                  <p style={{ color: "red" }}>
                    Please enter information into all parts of the form.
                  </p>
                )}
                {passwordNotMatch && (
                  <p style={{ color: "red" }}>
                    Passwords do not match.
                  </p>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#d62828", marginTop: "50px" }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Stack>
            {/* </form> */}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RegisterForm;
