import * as React from "react";
import { Grid, Card, Box, Button, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

function LoginCard(props) {

  return (
    <div style={{backgroundColor: "white", display: "flex", justifyContent: "center"}}>
      <Card style={{backgroundColor: "white", width: "700px", height: "400px", marginTop: "20vh", marginBottom: "24vh"}}>
        <h3 style={{textAlign: "center", color: "#d62828"}}>LOGIN</h3>
        <div style={{display: "flex", justifyContent: "center"}}>
            <FormControl style={{width: "300px"}}>
                <Input id="emailAddress" placeholder="Email Address" style={{padding: "5px"}}></Input>
                <Input id="password1" placeholder="Password" style={{paddingTop: "10px"}}></Input>  
            </FormControl>
        </div>
        <div style={{paddingTop: "20px", display: "flex", justifyContent: "center"}}>
            <Button>Login</Button>
        </div>
      </Card>
    </div>
  );
}

export default LoginCard;
