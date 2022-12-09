import React from "react";
import Card from "react-credit-cards-2";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import dayjs from "dayjs";
import { Box } from "@mui/system";

import Cookies from "universal-cookie";
import "react-credit-cards-2/es/styles-compiled.css";
import { Typography } from "@mui/material";

function getFullDate(concatenatedDate) {
  const split_dates = concatenatedDate.split("/");
  const month = split_dates[0];
  const day = split_dates[1];
  return dayjs().year() + "-" + month + "-" + day;
}

function getFullCardNumber(rawCardNumber) {
  const combinedNumber = rawCardNumber.replace(/\s/g, "");
  return parseInt(combinedNumber);
}

const CurrentCardNumber = () => {
  const [hiddenCardNum, setHiddenCardNum] = React.useState(0);

  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const bearer = "Bearer " + accessToken;
  console.log({ bearer });

  fetch("http://127.0.0.1:8000/subscriptions/payment_method/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const cardNumber = data.card_number.toString();
      console.log({cardNumber})
      const lastFourNumbers = cardNumber.substr(cardNumber.length - 4);
      setHiddenCardNum(lastFourNumbers);
    })
    .catch(error => console.error(error));

  return (
    <Box>
      <Typography>Current Card number ends in <b>{hiddenCardNum} </b></Typography>
    </Box>
  );
};

export default class EditCard extends React.Component {
  //from https://codesandbox.io/s/react-credit-card-3pw31?file=/src/utils.js:0-1306
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    has_payment_method: false,
  };

  resetInputFields() {
    this.setState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    });
  }

  uploadCardInfo(e, number, name, expiry, cvc, has_payment_method) {
    e.preventDefault();
    alert("You have finished payment!");
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;
    console.log({ bearer });
    const method = has_payment_method ? "PUT" : "POST"

    fetch("http://127.0.0.1:8000/subscriptions/payment_method/", {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({
        card_number: getFullCardNumber(number),
        security_code: parseInt(cvc),
        name: name,
        expiration: getFullDate(expiry),
      }),
    })
      .then(response => {
        if (response.status !== 201) {
          throw new Error(response.status);
        }
        this.setState({has_payment_method: true})
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.form.reset();
        this.resetInputFields();
      });
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      console.log(target.value);
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  componentDidMount() {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const bearer = "Bearer " + accessToken;

    fetch("http://127.0.0.1:8000/subscriptions/has_payment_method/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log({ data });
        this.setState({
          has_payment_method: data.has_payment_method,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { name, number, expiry, cvc, focused, issuer, has_payment_method } =
      this.state;

    const state = this.state;
    console.log({ state });

    const EditCardText = () => <h1>Overwrite your payment details</h1>;
    const SubmitCardText = () => <h1>Enter your payment details</h1>;

    return (
      <div key="Payment">
        <div className="App-payment">
          {has_payment_method ? <EditCardText /> : <SubmitCardText />}
          {has_payment_method && <CurrentCardNumber/>}
          <h4>please input your information below</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form
            ref={c => (this.form = c)}
            onSubmit={e => this.uploadCardInfo(e, number, name, expiry, cvc, has_payment_method)}
          >
            <div className="form-group">
              <small>Name on card:</small>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                pattern="[a-z A-Z-]+"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <small>Card Number:</small>

              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                maxLength="19"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>

            <div className="form-group">
              <small>Expiration Date:</small>

              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <small>CVC:</small>

              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
