import React, { useState, useEffect, useCallback } from "react";
import Home from "./pages/Home";
import Preloader from "./components/Preloader";
import { ReactLenis, useLenis } from "lenis/react";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  /* ---------------- Preloader State ---------------- */
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const onStartExit = useCallback(() => {
    setContentVisible(true);
  }, []);

  const onComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const lenis = useLenis((lenis) => {
    // runs on every scroll frame AFTER preload
  });

  /* ---------------- Disable Lenis during preload ---------------- */
  useEffect(() => {
    if (!lenis) return;

    if (showPreloader) {
      lenis.stop(); // freeze scroll
    } else {
      lenis.start(); // enable scroll
      lenis.scrollTo(0, { immediate: true }); // reset position
    }
  }, [showPreloader, lenis]);

  return (
    <div className="bg-black overflow-hidden relative">
      {/* Preloader - High Z-Index, covers everything */}
      {showPreloader && (
        <Preloader
          onStartExit={onStartExit}
          onComplete={onComplete}
        />
      )}

      {/* Main Content */}
      <ReactLenis root>
        <Router>
          <Routes>
            <Route path="/" element={<Home isPreloading={!contentVisible} />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
        <Footer />
      </ReactLenis>
    </div>
  );
};

export default App;
