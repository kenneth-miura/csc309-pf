import React, { useState, useEffect } from "react";
import { Tab, Card, Box, Button, FormControl, Input } from "@mui/material";
import Navbar from "./Navbar";
import { Stack } from "@mui/system";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar, Grid } from "@mui/material";

function ProfileInfoCard(props) {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    fetch("http://127.0.0.1:8000/accounts/info/", {
      method: "GET",
      headers: {
        'Accept': "application/json",
        'Authorization': 'Bearer ' + accessToken, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("I GRABBED DATA ON LOAD")
        console.log(data);
        // navigate("/");
        // console.log(data['access'])
        // console.log(cookie.get('fakeCookie'))
        // console.log(cookie.get('accessToken'));
      })
      .catch((error) => {
        console.log(error);
      });
  })

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
            width: "100vw",
            height: "100vh",
            marginTop: "15vh",
            //   marginBottom: "24vh",
            boxShadow: "none",
          }}
        >
          <h3
            style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}
          >
            MY ACCOUNT
          </h3>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                backgroundColor: "white",
                width: "80%",
                height: "400px",
              }}
            >
              <Grid container spacing={2}>
                <Grid>
                  <Avatar
                    sx={{
                      width: "100px",
                      height: "100px",
                      marginTop: "50px",
                      marginLeft: "50px",
                    }}
                    alt="avatar"
                    src="https://cdn.wallpapersafari.com/31/6/nb4NIR.jpg"
                  ></Avatar>
                </Grid>
                <Grid>
                  <h2
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                      paddingTop: "10px",
                      fontSize: "40px",
                    }}
                  >
                    YOUR NAME
                  </h2>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    EXTRA INFORMATION
                  </p>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
