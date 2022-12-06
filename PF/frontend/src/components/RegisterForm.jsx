import React, { useState, useRef} from "react";
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
  const [avatar, setAvatar] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  function handelRegister(data){
    data.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("phonenumber", phonenumber);
    formData.append("avatar", avatar);
    fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({usernam: username, first_name: firstname, last_name: lastname,
      email: email, password: password1, phone_number: phonenumber, avatar: avatar})
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
    });
  }
  return (
    <div>
    <Navbar position="sticky"></Navbar>
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
        <h3 style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}>Register</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form onsubmit={handelRegister}>
            <FormControl style={{ width: "300px" }}>
              <Input
                  id="Username"
                  placeholder="Username"
                  style={{ padding: "5px" }}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></Input>
                <label>Username</label>
                </FormControl>
                
                <FormControl style={{ width: "300px" }}>
                <Input
                  id="FirstName"
                  placeholder="First Name"
                  style={{ padding: "5px" }}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                ></Input>
                <label>First Name </label>
                </FormControl>
                
                <FormControl style={{ width: "300px" }}>
                <Input
                  id="Last Name"
                  placeholder="Last Name"
                  style={{ paddingTop: "10px" }}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                ></Input>
                <label>Last Name</label>
                </FormControl>

                <FormControl style={{ width: "300px" }}>
                <Input
                  id="Email"
                  placeholder="Email"
                  style={{ paddingTop: "10px" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Input>
                <label>Email</label>
                </FormControl>

                <FormControl style={{ width: "300px" }}>
                <Input
                  id="Password1"
                  placeholder="Password"
                  style={{ paddingTop: "10px" }}
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                ></Input>
                <label>Password</label>
                </FormControl>
                
                <FormControl style={{ width: "300px" }}>
                <Input
                  id="Password2"
                  placeholder="Confirm Password"
                  style={{ paddingTop: "10px" }}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                ></Input>
                <label>Confirm Password</label>
                </FormControl>
                
                <FormControl style={{ width: "300px" }}>
                <Input
                  id="Phone Number"
                  placeholder="Phone Number"
                  style={{ paddingTop: "10px" }}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                ></Input>
                <label>Phone Number</label>
                </FormControl>

                <FormControl style={{ width: "300px" }}>
                <Input type="file" id="avatar" name="avatar"
                onChange={(e) => {
                  setAvatar(e.target.value);
                }}></Input>
                <label>Avatar</label>
                
            </FormControl>
          </form>
        </div>
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" style={{ backgroundColor: "#d62828" }}> 
          <NavLink
              to={`/login`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Register  
            </NavLink>
                      
          </Button>
          
        </div>
        <hr style={{color: "#d62828", width: "300px", marginTop: "40px"}}></hr>
      </Card>
    </div>
    </div>
  );
}

export default RegisterForm;
