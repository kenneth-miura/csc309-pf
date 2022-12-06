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
import { useNavigate } from "react-router-dom";

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
  const [markerList, setMarkerList] = useState([]);

  Geocode.setApiKey("AIzaSyArlHQrmPayhiioSBJXmzaCSbM0ErHiktQ");

  const handleClick = () => {
    Geocode.fromAddress(postalCode).then(({ results }) => {
      const newCenter = results[0].geometry.location;
      setCenter(newCenter);

      fetch(
        "http://127.0.0.1:8000/studios/list/?page=1&" +
          new URLSearchParams({
            lat: newCenter.lat,
            long: newCenter.lng,
          }),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.status === 400) {
            // TODO: figure out how to do validation lol
            console.log("Didn't fill in form!");
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setMarkerList(data)
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

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
      <Button
        variant="primary"
        style={{ color: "brown", marginTop: "10px" }}
        onClick={handleClick}
      >
        Submit
      </Button>
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
            label={{text:`YOU ARE HERE`,color:'#000'}}
          />
          {
            !!markerList && markerList.map((m, index) => {
              const pos = {lat: Number(m.latitude), lng: Number(m.longitude)}
              const studioName = m.name;

              return (
                <MarkerF
                  key={index}
                  position={pos}
                  icon={{
                    url: StudioMarker,
                  }}
                  label={studioName}
                />
              )
            })
          }
        </>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
