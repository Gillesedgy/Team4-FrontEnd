import React from "react";
import { Routes, Route } from "react-router-dom";

//components
import Account from "./Pages/Profile/Account";
import Error from "./Pages/Error";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Welcome from "./Pages/Welcome/Welcome";
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
//Community Board
import CommunityBoard from "./Pages/CommunityBoard";
import PostDetails from "./Components/Posts/PostDetails";
import NewPostForm from "./Components/Posts/NewPostForm";
import EditPostForm from "./Components/Posts/EditPostForm";

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
        <Route path="/communityBoard" element={<CommunityBoard />} />
        <Route path="/communityBoard/:id" element={<PostDetails />} />
        <Route path="/communityBoard/:id/edit" element={<EditPostForm />} />
        <Route path="/communityBoard/new" element={<NewPostForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}
