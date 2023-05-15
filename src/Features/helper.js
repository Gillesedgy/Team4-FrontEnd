export function addressConverter(address, setLongitude, setLatitude) {
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
}
