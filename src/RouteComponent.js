import React from "react";
import { Routes, Route } from "react-router-dom";

//components
import Account from "./Pages/Account";
import CommunityBoard from "./Pages/CommunityBoard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Welcome from "./Pages/Welcome";
//? Jobs
import JobPage from "./Pages/Jobs/JobPage";
import JobDetails from "./Components/Jobs/JobDetails";
import JobEditPage from "./Pages/Jobs/JobEditPage";
import JobNewPage from "./Pages/Jobs/JobNewPage";
//? Rentals
import RentalPage from "./Pages/Rentals/RentalPage";
import RentalDetails from "./Components/Rentals/RentalDetails";
import RentalNewPage from "./Pages/Rentals/RentalNewPage";
import RentalEditPage from "./Pages/Rentals/RentalEditPage";

export default function RouteComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/edit" element={<JobEditPage />} />
        <Route path="/jobs/new" element={<JobNewPage />} />
        <Route path="/listings" element={<RentalPage />} />
        <Route path="/listings/:id" element={<RentalDetails />} />
        <Route path="/listings/:id/edit" element={<RentalEditPage />} />
        <Route path="/listings/new" element={<RentalNewPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="CommunityBoard" element={<CommunityBoard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}
