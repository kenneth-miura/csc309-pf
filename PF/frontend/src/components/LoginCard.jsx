import React, { useState, useEffect } from "react";
import { Tab, Card, Box, Button, FormControl, Input, TextField } from "@mui/material";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

import { Stack } from "@mui/system";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function LoginCard(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [usernameNotFilledIn, setUsernameNotFilledIn] = useState(false);
  const [passwordNotFilledIn, setPasswordNotFilledIn] = useState(false);
  const [accountNotExist, setAccountNotExist] = useState(false);

  useEffect(() => {
    if (!!!username) {
      setUsernameNotFilledIn(true);
    } else {
      setUsernameNotFilledIn(false);
    }
    
    if (!!!password) {
      setPasswordNotFilledIn(true);
    } else {
      setPasswordNotFilledIn(false);
    }
  })
  
  function handleSubmit(data) {
    data.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (response.status === 400) {
          // TODO: figure out how to do validation lol
          console.log("Didn't fill in form!");
          throw new Error(response.status);
        } else if (response.status === 401) {
          console.log("Account doesn't exist!");
          setAccountNotExist(true);
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Reached cookie setting")
        cookie.set("accessToken", data["access"], { path: "/" });

        navigate("/");

        // console.log(cookie.get('fakeCookie'))
        // console.log(cookie.get('accessToken'));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
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
            height: "700px",
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
                    name="username"
                    placeholder="Username"
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
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
                {passwordNotFilledIn && <p style={{color: "red"}}>Please enter a password. </p>}
                {usernameNotFilledIn && <p style={{color: "red"}}>Please enter a username. </p>}
                {accountNotExist && <p style={{color: "red"}}>The account does not exist.</p>}
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
            <Button variant="primary" style={{ backgroundColor: "#d62828" }}>
            <NavLink
              to={`/register`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </NavLink>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoginCard;
