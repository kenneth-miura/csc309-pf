import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import CurrentPlanCard from "./CurrentPlanCard";
import { Paper } from "@mui/material";
import Navbar from "../../components/Navbar";


export default function Subscription() {
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const isAuth = !!accessToken;
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20vh",
          paddingBottom: "20vh",
        }}
      >
        <CurrentPlanCard />
      </Box>
    </div>
  );
}
