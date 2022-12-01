import * as React from 'react';
import { Card } from '@mui/material';

function Main() {
  return (
    <div 
    style={{display: 'flex', width: '100%', height: '100%'}}
    className="MainPage">
        <Card style={{width: "100%", height: "60%", position: 'fixed', top: '0px'}}>
            <img style={{objectFit: "cover", width: "100%", height: "100%"}} src={require("../images/gym.png")}></img>
        </Card>

        <Card class="WelcomeText" style={{backgroundColor: "#d62828", position: "fixed", width: "100%", top: "467px"}}>
            <h1>WELCOME TO TORONTO FITNESS</h1>
        </Card>

    </div>
  );
}

export default Main;
