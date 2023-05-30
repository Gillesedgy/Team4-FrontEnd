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
export const handleLogo = () => {
  const jobIcons2 = [
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
  return jobIcons2;
};
