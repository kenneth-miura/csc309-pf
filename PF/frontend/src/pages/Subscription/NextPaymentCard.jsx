import { Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CardTextOnFail from "./CardTextOnFail";

export default function NextPaymentCard({rerender}) {
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;

    fetch("http://127.0.0.1:8000/subscriptions/next_payment/", {
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
        setPrice(data.price);
        setDate(data.date);
      })
      .catch(error => console.error(error));
  }, [rerender]);

  const CardTextOnSuccess = () => {
    return (
      <div>
        <Typography variant="h2">Billing Information</Typography>
        <Typography variant="body">
          Your next payment is due on <b>{date}</b> and you'll be charged <b>${price}</b>
        </Typography>
      </div>
    );
  };

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
      {error ? <CardTextOnFail /> : <CardTextOnSuccess />}
    </Card>
  );
}
