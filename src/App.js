import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import NavBar from "./Components/NavBar";
import Account from "./Pages/Account";
import CommunityBoard from "./Pages/CommunityBoard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Welcome from "./Pages/Welcome";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Components/JobDetails";
import JobEdit from "./Components/JobEdit";
import Rentals from "./Pages/Rentals";
import RentalDetails from "./Components/RentalDetails";
import RentalEdit from "./Components/RentalEdit";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/edit" element={<JobEdit />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals/:id" element={<RentalDetails />} />
          <Route path="/rentals/:id/edit" element={<RentalEdit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="CommunityBoard" element={<CommunityBoard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
