import React from "react";
import jobpic1 from "../../Assets/jobpic1.png";
import jobpic2 from "../../Assets/jobpic2.png";
import jobpic3 from "../../Assets/jobpic3.png";
import jobpic4 from "../../Assets/jobpic4.png";
import jobpic5 from "../../Assets/jobpic5.png";
import jobpic6 from "../../Assets/jobpic6.png";
import jobpic7 from "../../Assets/jobpic7.png";
import jobpic8 from "../../Assets/jobpic8.png";
import jobpic9 from "../../Assets/jobpic9.png";
export const LogoSelect = ({ selectedLogo, handleLogoSelect }) => {
  const jobIcons = [
    { value: jobpic1, label: "logo1" },
    { value: jobpic2, label: "logo2" },
    { value: jobpic3, label: "logo3" },
    { value: jobpic4, label: "logo4" },
    { value: jobpic5, label: "logo5" },
    { value: jobpic6, label: "logo6" },
    { value: jobpic7, label: "logo7" },
    { value: jobpic8, label: "logo8" },
    { value: jobpic9, label: "logo9" },
  ];
  return (
    <div className="job-logo">
      <label>
        Logo: <img src={selectedLogo} alt="Selected Logo" />
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
