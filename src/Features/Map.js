import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Search from "./Search";

export default function Map() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    const centered = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.log("Error getting your current position: " + error.message);
        }
      );
    };
    centered();
  }, []);

  const addressConverter = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, function (results, status) {
        if (
          status === window.google.maps.GeocoderStatus.OK &&
          results.length > 0
        ) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          setLongitude(lng);
          setLatitude(lat);
          resolve({ lat, lng });
        } else {
          reject("Address not found!");
        }
      });
    });
  };

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
    <div>
      <div className="Map_Container">
        <div className="places_container">
          {/* <Search
            addressConverter={handleAddressSubmit}
            lat={latitude}
            lng={longitude}
          /> */}
        </div>
        <div className="Map">
          {/* <GoogleMap
            zoom={15}
            center={{ lat: latitude, lng: longitude }}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >
            <Marker size={33} position={{ lat: latitude, lng: longitude }} />
          </GoogleMap> */}
          {/* <p>Checking for Map</p> */}
        </div>
      </div>
    </div>
  );
}

//  This centered function is used to grab the user's current location. Two states were created and restated to the user's coords by long and lat. (Navigator.getCurrentlPosition method that allows the web to access user's location  )

//  handleAddressSubmit This function take the new address and updates the map

// This  addressConverter =  function is used to convert a regual address to long lat coordinates. GetLongLat Function
// param address from places
