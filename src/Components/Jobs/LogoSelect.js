import React from "react";
import "./LogoSelect.css";
// Maintenance
import HandTool from "../../Assets/HandTool.png";
// Tutor / Teacher
export const LogoSelect = ({ selectedLogo, handleLogoSelect }) => {
  const shopper =
    "https://www.nicepng.com/png/detail/395-3951102_bag-shop-shopper-shopping-icon-bag-the-black.png";
  const finance =
    "https://png.pngtree.com/png-vector/20190725/ourmid/pngtree-vector-money-saving-icon-png-image_1576708.jpg";
  const educate =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVg6yJQbpwP-io2MpAJrATPM1tFyfYsxWWA&usqp=CAU";
  const talent =
    "https://www.pngitem.com/pimgs/m/9-95013_transparent-idea-vector-png-black-and-white-design.png";
  const childcare =
    "https://i.pinimg.com/736x/1c/05/63/1c05634cf78ee7bb8d9c5288a2c6e58d.jpg";
  const Construction =
    "https://www.pngkey.com/png/detail/412-4120823_construction-worker-blue-collar-job-icon.png";
  const clerical =
    "https://static.vecteezy.com/system/resources/previews/000/356/947/original/workspace-vector-icon.jpg";

  const jobIcons = [
    { value: shopper, label: "Deliveries/Errands/Shopping" },
    { value: clerical, label: "Assistant/Office work" },
    { value: finance, label: "Book-keeping/CPA/Finaces" },
    { value: educate, label: "Instructor/Teaching/Tutor" },
    { value: HandTool, label: "Maintenance/Mechanic/Repair" },
    { value: Construction, label: "Construction" },
    { value: talent, label: "Artist/Designer/Engineer" },
    { value: childcare, label: "Babbysitter/Childcare" },
  ];
  return (
    <div className="job-logo">
      <label>
        Logo:{" "}
        <img className="selected-logo" src={selectedLogo} alt="Selected Logo" />
      </label>
      <select value={selectedLogo} onChange={handleLogoSelect} required>
        <option value="">Select a logo</option>
        {jobIcons.map((logo) => (
          <option value={logo.value} key={logo.value}>
            {logo.label}
          </option>
        ))}
      </select>
    </div>
  );
};
