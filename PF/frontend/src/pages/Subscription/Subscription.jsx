import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CurrentPlanCard from "./CurrentPlanCard";
import Navbar from "../../components/Navbar";
import { Box, Stack } from "@mui/system";
import NextPaymentCard from "./NextPaymentCard";
import ShowPlanCards from "./ShowPlansCard";
import PastPayments from "./PastPayments";

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
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          { onMonthlyPlan && <CurrentPlanCard />}
          { onYearlyPlan && <CurrentPlanCard />}
          { onMonthlyPlan && <NextPaymentCard />}
          { onYearlyPlan && <NextPaymentCard/>}
          <ShowPlanCards
            onMonthlyPlan={onMonthlyPlan}
            setOnMonthlyPlan={setOnMonthlyPlan}
            onYearlyPlan={onYearlyPlan}
            setOnYearlyPlan={setOnYearlyPlan}
          />
          <PastPayments/>
        </Stack>
      </Box>
    </div>
  );
}
