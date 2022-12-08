import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button, Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
//TODO: Create endpoint for EDIT subscription if exists, CREATE if not (THIS IS PUT)

function UnsubscribeButton({ setEnrolled }) {
  function unsubscribe() {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;
    fetch("http://127.0.0.1:8000/subscriptions/subscription/", {
      method: "DELETE",
      headers: {
        Authorization: bearer,
      },
    }).then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        setEnrolled(true);
      }
    });

    return (<Button
      onClick={unsubscribe}
    >
      Cancel Plan
    </Button>)
  }
}

function PlanCard({ type, price, id, isEnrolled }) {
  return (
    <Card
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "300px",
        height: "300px",
        padding: "30px",
      }}
    >
      <Typography variant="h3">{type}</Typography>
      <Typography variant="body">
        {price} {type}
      </Typography>
    </Card>
  );
}

export default function ShowPlanCards() {
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
  const [onMonthlyPlan, setOnMonthlyPlan] = useState(false);
  const [onYearlyPlan, setOnYearlyPlan] = useState(false);
  const [monthlyId, setMonthlyId] = useState(null);
  const [yearlyId, setYearlyId] = useState(null);
  const [error, setError] = useState(false);

  console.log({ monthlyPrice });
  console.log({ yearlyPrice });
  console.log({ onMonthlyPlan });
  console.log({ onYearlyPlan });

  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;

    fetch("http://127.0.0.1:8000/subscriptions/plans/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then(response => {
        if (response.status !== 200) {
          setError(true);
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        setMonthlyPrice(data.Monthly.price);
        setMonthlyId(data.Monthly.id);

        setYearlyPrice(data.Yearly.price);
        setYearlyId(data.Yearly.id);

        if (!("user_plan" in data)) {
          setOnMonthlyPlan(false);
          setOnYearlyPlan(false);
        } else if (data.user_plan === "Monthly") {
          setOnMonthlyPlan(true);
        } else if (data.user_plan === "Yearly") {
          setOnYearlyPlan(true);
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Card
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "900px",
        height: "450px",
        padding: "30px",
      }}
    >
      <Stack spacing={2} direction="row">
        <PlanCard
          type="Monthly"
          price={monthlyPrice}
          isEnrolled={onMonthlyPlan}
          id={monthlyId}
        />
        <PlanCard
          type="Yearly"
          price={yearlyPrice}
          isEnrolled={onYearlyPlan}
          id={yearlyId}
        />
      </Stack>
    </Card>
  );
}
