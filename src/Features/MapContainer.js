import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
//helper
import { addressConverter } from "./helper";
const gKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export default function MapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gKey,
  });
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    // Gets LongLat
    //Todo: Delete line 17, and 30..
    // const centered = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      (error) => {
        console.log("Error getting your current position: " + error.message);
        // setLongitude(0);
        // setLatitude(0);
      }
    );
    // };
    // centered();
  }, []);

  const handleAddressSubmit = (address) => {
    addressConverter(address)
      .then((coords) => {
        setLatitude(coords.lat);
        setLongitude(coords.lng);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          // addressConverter={addressConverter}
          zoom={9}
          center={{ lat: latitude, lng: longitude }}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
          <Marker size={33} position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      ) : (
        <p>Map Error, check address again</p>
      )}
    </div>
  );
}

//  This centered function is used to grab the user's current location. Two states were created and restated to the user's coords by long and lat. (Navigator.getCurrentlPosition method that allows the web to access user's location  )

//  handleAddressSubmit This function take the new address and updates the map

// This  addressConverter =  function is used to convert a regual address to long lat coordinates. GetLongLat Function
// param address from places
