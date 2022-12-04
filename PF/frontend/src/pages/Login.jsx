import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import styles from './Login.module.css'
import LoginCard from "../components/LoginCard/LoginCard";

function LoginPage() {
    return (
      <div>
        <Box className={styles.basebox}>
            <LoginCard></LoginCard>
        </Box>
      </div>
    );
  }
  
  export default LoginPage;
  