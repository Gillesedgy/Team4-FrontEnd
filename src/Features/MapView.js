import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api"; // this is needed to make sure the map loads correctly
import Map from "./Map";

function MapView() {
  // const gKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY2;
  // allows us to see if the map is loaded
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: gKey,
  });
  // if map isnt working or loaded
  if (!isLoaded) return <div>Map Error, check address again</div>;
  if (isLoaded)
    return (
      <div>
        {/* <h1>MapView</h1> */}
        {/* <Map /> */}
      </div>
    );
}

export default MapView;
