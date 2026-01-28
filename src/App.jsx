import React, { useState, useEffect, useCallback } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Preloader from "./components/Preloader";
import { ReactLenis, useLenis } from "lenis/react";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Collaborate from "./pages/Collaborate";
import CaseStudy from "./pages/CaseStudy";
import CaseStudyStatic from "./pages/CaseStudyStatic";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import CaseStudyDuo from "./pages/CaseStudyDuo";
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
            <Route path="/" element={<PageTransition><Home isPreloading={!contentVisible} /></PageTransition>} />
            <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/collaborate" element={<PageTransition><Collaborate /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About isPreloading={!contentVisible} /></PageTransition>} />
            <Route path="/case-study-static" element={<PageTransition><CaseStudyStatic /></PageTransition>} />
            <Route path="/case-study-duo" element={<PageTransition><CaseStudyDuo /></PageTransition>} />
            <Route path="/case-study/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Router>
        <Footer />
      </ReactLenis>
    </div>
  );
};

export default App;
