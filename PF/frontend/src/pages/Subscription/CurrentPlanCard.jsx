import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CardTextOnFail from "./CardTextOnFail";

function getRate(period, price) {
  return price + " " + period;
}
export default function CurrentPlanCard({}) {
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;
    fetch("http://127.0.0.1:8000/subscriptions/subscription/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then(response => {
        if (response.status != 200) {
          setError(true);
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        setPrice(data.price);
        setPeriod(data.period);
      })
      .catch(error => console.error(error));
  }, []);

  const CardTextOnSuccess = () => {
    return (
      <div>
        <Typography variant="h4"> {period + " Plan"}</Typography>
        <Typography variant="h6">{getRate(period, price)}</Typography>
      </div>
    );
  };

  return (
    <div>
      <Card
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "300px",
          height: "300px",
          padding: "5px",
        }}
      >
        {error ? <CardTextOnFail /> : <CardTextOnSuccess />}
      </Card>
    </div>
  );
}
