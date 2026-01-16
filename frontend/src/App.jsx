import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import ScrollToTop from "./components/ScrollToTop";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <ScrollToTop />
      <NavBar />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery/:missionId" element={<GalleryPage />} />
            <Route path="/register/:eventId" element={<RegisterPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;