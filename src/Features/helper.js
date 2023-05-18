export function addressConverter(address) {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
      if (
        status === window.google.maps.GeocoderStatus.OK &&
        results.length > 0
      ) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        // setLongitude(lng);
        // setLatitude(lat);
        resolve({ lat, lng });
      } else {
        reject("Address not found!");
      }
    });
  });
}

export const handleAddressSubmit = (address, setLatitude, setLongitude) => {
  addressConverter(address)
    .then((coords) => {
      setLatitude(coords.lat);
      setLongitude(coords.lng);
    })
    .catch((error) => {
      console.error(error);
    });
};
