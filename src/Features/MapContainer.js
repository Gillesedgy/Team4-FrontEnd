import React, { useState, useEffect } from "react";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const gKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export default function MapContainer({ location }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gKey,
  });
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  //? map and marker ------------------------
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  //? ---------------------------------------
  useEffect(() => {

    //
    function handleAddressSubmit(address) {
      addressConverter(address)
        .then((coords) => {
          setLatitude(coords.latitude);
          setLongitude(coords.lng);
          if (map) {
            if (marker) {
              // This condition will check is theres a marker present... if so,it removes it
              marker.setMap(null);
            }

            // Create new marker
            const newMarker = new window.google.maps.Marker({
              position: coords,
              map: map,
            });
            setMarker(newMarker);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    handleAddressSubmit(String(location));
  }, [location, map]);
    setTimeout(handleAddressSubmit(String(location)), 2000);
  }, [location]);

  function addressConverter(address) {
    return new Promise((resolve, reject) => {
      //
      if (!window.google.maps || !window.google.maps.Geocoder) {
        reject("Google Maps API is not loaded");
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, function (results, status) {
        console.log("results", results);
        if (
          status === window.google.maps.GeocoderStatus.OK &&
          results.length > 0
        ) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          //* const formattedAddress = results[0].formatted_address;
          setLongitude(lng);
          setLatitude(lat);
          console.log(lat, lng); //!
          // console.log(`Formatted Address: ${formattedAddress}`); //!
          //* resolve({ formattedAddress, lat, lng });
          resolve({ lat, lng });
        } else {
          reject("Address not found!");
        }
      });
    });
  }
  console.log("latitude", latitude, " ", "longitude:", longitude);

  //? Load thr map
  function handleMapLoad(map) {
    setMap(map);
  }
  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          zoom={20}
          center={{ lat: latitude, lng: longitude }}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          onLoad={handleMapLoad}
        >
          {/* <Marker size={33} position={{ lat: 0, lng: 0 }} /> */}
        </GoogleMap>
      ) : (
        <p>Map Error, check address again</p>
      )}
    </div>
  );
}
