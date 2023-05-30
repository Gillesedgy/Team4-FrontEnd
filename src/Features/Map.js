// import React, { useState, useEffect } from "react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const gKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

// export default function MapContainer({ location }) {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: gKey,
//   });
//   const [longitude, setLongitude] = useState(0);
//   const [latitude, setLatitude] = useState(0);

//   useEffect(() => {
//     function handleAddressSubmit(address) {
//       extractCoordinatesFromAddress(address)
//         .then(({ lat, lng }) => {
//           setLatitude(lat);
//           setLongitude(lng);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }

//     handleAddressSubmit(String(location));
//   }, [location]);

//   function extractCoordinatesFromAddress(formattedAddress) {
//     return new Promise((resolve, reject) => {
//       if (!window.google.maps || !window.google.maps.Geocoder) {
//         reject(new Error("Google Maps API is not loaded"));
//         return;
//       }
//       const geocoder = new window.google.maps.Geocoder();
//       geocoder.geocode({ address: formattedAddress }, (results, status) => {
//         if (
//           status === window.google.maps.GeocoderStatus.OK &&
//           results.length > 0
//         ) {
//           const { lat, lng } = results[0].geometry.location;
//           resolve({ lat, lng });
//         } else {
//           reject(new Error("Failed to extract coordinates from address."));
//         }
//       });
//     });
//   }

//   console.log("Latitude:", latitude);
//   console.log("Longitude:", longitude);

//   return (
//     <div className="map">
//       {isLoaded ? (
//         <GoogleMap
//           zoom={16}
//           center={{ lat: latitude, lng: longitude }}
//           mapContainerStyle={{ height: "100%", width: "100%" }}
//         >
//           <Marker
//             size={30}
//             position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//           />
//         </GoogleMap>
//       ) : (
//         <p>Map Error, check address again</p>
//       )}
//     </div>
//   );
// }

//* ----------------------------------------------------------------
//  This centered function is used to grab the user's current location. Two states were created and restated to the user's coords by long and lat. (Navigator.getCurrentlPosition method that allows the web to access user's location  )

//  handleAddressSubmit This function take the new address and updates the map

// This  addressConverter =  function is used to convert a regual address to long lat coordinates. GetLongLat Function
// param address from places
