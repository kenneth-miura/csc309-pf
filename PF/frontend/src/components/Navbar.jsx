import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { ReactComponent as MainLogo } from "../images/TFC_main.svg";
import { Outlet, NavLink } from "react-router-dom";

const pages = ['studios', 'classes', 'pricing'];

function Navbar() {

  return (
    <AppBar style={{backgroundColor: "#d62828"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MainLogo style={{width: "15%"}}></MainLogo>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block'}}
              >
                <NavLink to={`/${page}`} style={{color: 'white', textDecoration: 'none'}}>{page}</NavLink>
              </Button>
            ))}
          </Box>
          <Button
                sx={{ my: 2, color: 'white', display: 'block', right: "40px"}}
              >
                <NavLink to={`/login`} style={{color: 'white', textDecoration: 'none'}}>Login / Sign Up</NavLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;