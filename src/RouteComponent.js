import React from "react";
import { Routes, Route } from "react-router-dom";
import { matchRoutes } from "react-router";

//components
import Account from "./Pages/Account";
import CommunityBoard from "./Pages/CommunityBoard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Welcome from "./Pages/Welcome";
//? Jobs
import JobPage from "./Pages/JobPage";
import JobDetails from "./Components/Jobs/JobDetails";
import JobEdit from "./Components/Jobs/JobEdit";
import NewJob from "./Components/Jobs/NewJob";
//? Rentals
import RentalPage from "./Pages/RentalPage";
import RentalDetails from "./Components/Rentals/RentalDetails";
import NewRental from "./Components/Rentals/NewRental";
import RentalEdit from "./Components/Rentals/RentalEdit";

export default function RouteComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/edit" element={<JobEdit />} />
        <Route path="/jobs/new" element={<NewJob />} />
        <Route path="/rentals" element={<RentalPage />} />
        <Route path="/rentals/:id" element={<RentalDetails />} />
        <Route path="/rentals/:id/edit" element={<RentalEdit />} />
        <Route path="/rentals/new" element={<NewRental />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="CommunityBoard" element={<CommunityBoard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}
