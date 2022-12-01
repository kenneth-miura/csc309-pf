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
        <div class="Carousel" style={{position: "absolute", width: '100%', top: "50px"}}>
            <ImageCarousel></ImageCarousel>
        </div>

        <Card class="WelcomeText" style={{backgroundColor: "#d62828", position: "fixed", width: "100%", top: "467px"}}>
            <h1>WELCOME TO TORONTO FITNESS</h1>
        </Card>

        <Container >
           
        </Container>

    </div>
  );
}

export default Main;
