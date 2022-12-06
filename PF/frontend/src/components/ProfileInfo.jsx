import React, { useState, useEffect } from "react";
import { Tab, Card, Box, Button, FormControl, Input } from "@mui/material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar, Grid } from "@mui/material";

function ProfileInfoCard(props) {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const navigate = useNavigate();

  function handleClick() {
      navigate("/myaccount/edit")
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts/info/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Retrieved data upon page load.")
        // console.log(data);
        // console.log(data.avatar);

        setUsername(data.username);
        setPassword(data.password);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatar(data.avatar);
        setPhoneNum(data.phone_number);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
                width: "50%",
                height: "200px",
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
                    alt={firstName}
                    src={avatar}
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
                      marginBottom: "0px",
                    }}
                  >
                    {firstName + " " + lastName}
                  </h2>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    {username}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    {email}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    {phoneNum}
                  </p>
                </Grid>
                <Grid>
                  <Button
                    onClick={handleClick}
                    variant="secondary"
                    style={{
                      color: "#d62828",
                      marginTop: "50px",
                      marginLeft: "220px",
                    }}
                  >
                    Edit Profile
                  </Button>
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
