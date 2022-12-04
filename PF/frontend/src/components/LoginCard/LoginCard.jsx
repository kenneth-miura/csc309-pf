import * as React from "react";
import { Grid, Card, Box, Button, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

function LoginCard(props) {

  return (
    <div style={{backgroundColor: "white", display: "flex", justifyContent: "center"}}>
      <Card style={{backgroundColor: "white", width: "700px", height: "400px", marginTop: "20vh", marginBottom: "24vh"}}>
        <h3 style={{color: "#d62828"}}>LOGIN</h3>
        <FormControl style={{width: "300px"}}>
            <Input id="emailAddress" placeholder="Email Address"></Input>
            <Input id="password1" placeholder="Password"></Input>  
        </FormControl>
        <Button>Login</Button>
      </Card>
    </div>
  );
}

export default LoginCard;
