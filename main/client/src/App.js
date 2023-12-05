import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import BlankLayout from "./Layout/BlankLayout";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layout/MainLayout";
import Homepage from "./pages/Homepage";
import EventSignupPage from "./pages/EventSignupPage";
import Signup from "./components/signup/Signup.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import AuthRequired from "./auth/AuthRequired";
import EventPage from "./pages/EventPage";
import UserEventPage from "./pages/UserEventPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <AuthRequired>
            <MainLayout />
          </AuthRequired>
        }
      >
        <Route path="me/my-events" element={<UserEventPage />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* will change the path to "e/:id/sign-up" */}
        <Route path="e/:id/sign-up" element={<EventSignupPage />} />
        {/* <Route path="e/sign-up" element={<EventSignupPage />} /> */}
      </Route>

      {/* Public routes */}
      <Route element={<BlankLayout />}>
        <Route index path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="EventPage" element={<EventPage />} />
        <Route path="homepage" element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
