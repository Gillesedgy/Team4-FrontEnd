import React, { useState } from "react";
// responsible for handling address input in search bar.
export default function Search({ addressConverter, lat, lng }) {
  // for address conversion
  const [address, setAddress] = useState("");

  // Address input => Address Change
  const handleAddressUpdate = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addressConverter(address);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Search for things here...</h1>
      <label htmlFor="address">
        Address:
        <input
          className="Search"
          type="text"
          value={address}
          onChange={handleAddressUpdate}
        />
      </label>
      <button type="submit">Search</button>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>
    </form>
  );
}
