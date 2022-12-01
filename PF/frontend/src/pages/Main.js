import * as React from 'react';
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/Carousel'
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { Card } from '@mui/material';

function Main() {
  return (
    <div 
    style={{width: '100%', height: '100%'}}
    className="MainPage">
        <Navbar position="sticky"></Navbar>

        <Container class="WelcomeText" style={{position: "relative", width: "100%", top: "80%"}}>
            <Card >
                <h1>WELCOME TO TORONTO FITNESS</h1>
            </Card>
        </Container>

        <div class="Carousel" style={{position: "absolute", width: '100%', top: "10px"}}>
            <ImageCarousel></ImageCarousel>
        </div>

    </div>
  );
}

export default Main;
