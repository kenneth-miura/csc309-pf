import React, { useState, useRef } from "react";
import { Tab, Card, Box, Button, FormControl, Input } from "@mui/material";
import Navbar from "./Navbar";
import { Stack } from "@mui/system";
import Cookies from 'universal-cookie';

function LoginCard(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(data) {
    data.preventDefault();
    const cookie = new Cookies();

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: email, password: password}),
    })
    .then((response) => response.json())
      .then((data) => {
        cookie.set('accessToken', data['access'], {path: '/'})

        console.log(data['access'])
        console.log(cookie.get('accessToken'));
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          <h3
            style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}
          >
            LOGIN
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
              <Stack>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="emailAddress"
                    placeholder="Email Address"
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <div
                  style={{
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#d62828" }}
                  >
                    Login
                  </Button>
                </div>
              </Stack>
            </form>
          </div>

          <hr
            style={{ color: "#d62828", width: "300px", marginTop: "40px" }}
          ></hr>
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
