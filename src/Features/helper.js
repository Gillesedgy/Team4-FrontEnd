// Icons
import jobpic1 from "../Assets/jobpic1.png";
import jobpic2 from "../Assets/jobpic2.png";
import jobpic3 from "../Assets/jobpic3.png";
import jobpic4 from "../Assets/jobpic4.png";
import jobpic5 from "../Assets/jobpic5.png";
import jobpic6 from "../Assets/jobpic6.png";
import jobpic7 from "../Assets/jobpic7.png";
import jobpic8 from "../Assets/jobpic8.png";
import jobpic9 from "../Assets/jobpic9.png";
//
// export function addressConverter(address) {
//   return new Promise((resolve, reject) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ address: address }, function (results, status) {
//       if (
//         status === window.google.maps.GeocoderStatus.OK &&
//         results.length > 0
//       ) {
//         const lat = results[0].geometry.location.lat();
//         const lng = results[0].geometry.location.lng();
//         // setLongitude(lng);
//         // setLatitude(lat);
//         resolve({ lat, lng });
//       } else {
//         reject("Address not found!");
//       }
//     });
//   });
// }

// export const handleAddressSubmit = (address, setLatitude, setLongitude) => {
//   addressConverter(address)
//     .then((coords) => {
//       setLatitude(coords.lat);
//       setLongitude(coords.lng);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
//Job Icons
const jobIcons = [
  jobpic1,
  jobpic2,
  jobpic3,
  jobpic4,
  jobpic5,
  jobpic6,
  jobpic7,
  jobpic8,
  jobpic9,
];
export const handleIcons = () => {
  // randomize Icon
  const randomizeIcon = jobIcons[Math.floor(Math.random() * jobIcons.length)];
  return randomizeIcon;
};
