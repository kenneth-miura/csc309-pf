import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button, Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CardTextOnFail from "./CardTextOnFail";


function SubscribeButton({setEnrolled, setOtherEnrolled, target_plan_id}){
  function subscribe(){
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;


    fetch("http://127.0.0.1:8000/subscriptions/subscription/",
    {
      method: "PUT",
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"subscription_type_id": target_plan_id})
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        setEnrolled(true);
        setOtherEnrolled(false);
      } else {
        throw new Error(response.status);
      }
    })
  }

  return (<Button
    onClick={subscribe}
    variant="contained"
    sx={{ maxHeight: "50px", width: "150px"}}
  >
    Enroll
  </Button>)
}
function UnsubscribeButton({ setEnrolled}) {
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
        setEnrolled(false);
      }
    });

  }
  return (<Button
    onClick={unsubscribe}
    variant="contained"
    sx={{ maxHeight: "50px", width: "150px"}}
  >
    Cancel Plan
  </Button>)
}

function PlanCard({ type, price, id, isEnrolled, setEnrolled, setOtherEnrolled}) {
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
        ${price} {type}
      </Typography>

      {isEnrolled && <UnsubscribeButton setEnrolled={setEnrolled}/>}
      {!isEnrolled && <SubscribeButton setEnrolled={setEnrolled} target_plan_id={id} setOtherEnrolled={setOtherEnrolled}/>}
    </Card>
  );
}

export default function ShowPlanCards({onMonthlyPlan, setOnMonthlyPlan, onYearlyPlan, setOnYearlyPlan}) {
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
  const [monthlyId, setMonthlyId] = useState(null);
  const [yearlyId, setYearlyId] = useState(null);
  const [error, setError] = useState(false);


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
  }, [setOnYearlyPlan, setOnMonthlyPlan]);

  const RenderedOnSuccess = () => (
      <Stack spacing={2} direction="row">
        <PlanCard
          type="Monthly"
          price={monthlyPrice}
          isEnrolled={onMonthlyPlan}
          id={monthlyId}
          setEnrolled={setOnMonthlyPlan}
          setOtherEnrolled={setOnYearlyPlan}
        />
        <PlanCard
          type="Yearly"
          price={yearlyPrice}
          isEnrolled={onYearlyPlan}
          id={yearlyId}
          setEnrolled={setOnYearlyPlan}
          setOtherEnrolled={setOnMonthlyPlan}
        />
      </Stack>
  )
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
      {error ? <CardTextOnFail/>: <RenderedOnSuccess/>}
    </Card>
  );
}
