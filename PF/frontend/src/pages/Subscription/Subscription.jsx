import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CurrentPlanCard from "./CurrentPlanCard";
import Navbar from "../../components/Navbar";
import { Box, Stack} from "@mui/system";
import {Card} from "@mui/material";
import NextPaymentCard from "./NextPaymentCard";
import ShowPlanCards from "./ShowPlansCard";
import PastPayments from "./PastPayments";
import EditCard from "./EditCard";

export default function Subscription() {
  const [onMonthlyPlan, setOnMonthlyPlan] = useState(false);
  const [onYearlyPlan, setOnYearlyPlan] = useState(false);

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
        <Stack spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "900px",
              height: "450px",
            }}
          >
            <Stack direction="row" spacing={30}>
              {onMonthlyPlan && <CurrentPlanCard />}
              {onYearlyPlan && <CurrentPlanCard />}
              {onMonthlyPlan && <NextPaymentCard />}
              {onYearlyPlan && <NextPaymentCard />}

            </Stack>
          </Box>
          <ShowPlanCards
            onMonthlyPlan={onMonthlyPlan}
            setOnMonthlyPlan={setOnMonthlyPlan}
            onYearlyPlan={onYearlyPlan}
            setOnYearlyPlan={setOnYearlyPlan}
          />
          <PastPayments />
          <EditCard />
        </Stack>
      </Box>
    </div>
  );
}
