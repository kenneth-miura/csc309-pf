import * as React from "react";
import { Tab, Card, Box, Button, FormControl, Input } from "@mui/material";
import Navbar from "./Navbar";


function LoginCard(props) {
  return (
    <div>
    <Navbar position="sticky" isLoginPage={true}></Navbar>
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
          height: "500px",
          marginTop: "20vh",
          marginBottom: "24vh",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}>LOGIN</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControl style={{ width: "300px" }}>
            <Input
              id="emailAddress"
              placeholder="Email Address"
              style={{ padding: "5px" }}
            ></Input>
            <Input
              id="password1"
              placeholder="Password"
              style={{ paddingTop: "10px" }}
            ></Input>
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
            Login
          </Button>
        </div>
        <hr style={{color: "#d62828", width: "300px", marginTop: "40px"}}></hr>
        <div
          style={{
            margin: "0px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p>Don't have an account?</p>
        </div>
        <div
          style={{
            paddingTop: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="primary" style={{ color: "#d62828" }}>
            Register
          </Button>
        </div>
      </Card>
    </div>
    </div>
  );
}

export default LoginCard;