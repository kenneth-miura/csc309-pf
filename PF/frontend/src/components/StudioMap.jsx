import React, { useState } from "react";
import { Card, Box, Button, TextField, InputLabel } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import UserMarker from "../images/user_marker.svg";
import StudioMarker from "../images/studio_marker.svg";
import Geocode from "react-geocode";

const containerStyle = {
  width: "60vw",
  height: "50vh",
  marginTop: "50px",
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
];

const myOptions = {
  zoom: 30,
  styles: myStyles,
};

export default function StudioMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyArlHQrmPayhiioSBJXmzaCSbM0ErHiktQ",
  });

  const [map, setMap] = React.useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [center, setCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });

  Geocode.setApiKey("AIzaSyArlHQrmPayhiioSBJXmzaCSbM0ErHiktQ");

  return isLoaded ? (
    <div style={{ paddingTop: "100px" }}>
      <InputLabel htmlFor="postal">Enter your postal code: </InputLabel>
      <TextField
        name="postal"
        placeholder="Postal Code"
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
      ></TextField>
      <Button variant="primary" style={{color: "brown", marginTop: "10px"}} onClick={() => {
        Geocode.fromAddress(postalCode).then(({results}) => {
          setCenter(results[0].geometry.location)
        });
      }}>Submit</Button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={myOptions}
        zoom={15}
        center={center}
      >

        <>
          {/* This is the marker of the user */}
          <MarkerF
            position={center}
            icon={{
              url: UserMarker,
            }}
          />
        </>

      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
