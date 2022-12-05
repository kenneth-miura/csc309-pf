import * as React from "react";
import { Tab, Card, Box, Button, FormControl, Input } from "@mui/material";
import Navbar from "./Navbar";


function RegisterForm(props) {
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
          <FormControl style={{ width: "300px" }}>
          
          <Input
              id="Username"
              placeholder="Username"
              style={{ paddingTop: "10px" }}
            ></Input>
            <label>Username</label>
            <Input
              id="FirstName"
              placeholder="First Name"
              style={{ padding: "5px" }}
            ></Input>
            <label>First Name</label>
            <Input
              id="Last Name"
              placeholder="Last Name"
              style={{ paddingTop: "10px" }}
            ></Input>
            <label>Last Name</label>
            <Input
              id="Email"
              placeholder="Email"
              style={{ paddingTop: "10px" }}
            ></Input>
            <label>Email</label>
            <Input
              id="Password1"
              placeholder="Password"
              style={{ paddingTop: "10px" }}
            ></Input>
            <label>Password</label>
            <Input
              id="Password2"
              placeholder="Confirm Password"
              style={{ paddingTop: "10px" }}
            ></Input>
            <label>Confirm Password</label>
            <Input
              id="Phone Number"
              placeholder="Phone Number"
              style={{ paddingTop: "10px" }}
            ></Input>
            <label>Phone Number</label>
            <Input type="file" id="avatar" name="avatar"></Input>
            <label>Avatar</label>
            
          </FormControl>
        </div>
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" style={{ backgroundColor: "#d62828" }}>
            Register
          </Button>
        </div>
        <hr style={{color: "#d62828", width: "300px", marginTop: "40px"}}></hr>
      </Card>
    </div>
    </div>
  );
}

export default RegisterForm;