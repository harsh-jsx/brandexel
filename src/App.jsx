import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Preloader from "./components/Preloader";
import { ReactLenis, useLenis } from "lenis/react";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const lenis = useLenis((lenis) => {
    // runs on every scroll frame AFTER preload
    // console.log(lenis);
  });

  /* ---------------- Disable Lenis during preload ---------------- */
  useEffect(() => {
    if (!lenis) return;

    if (isLoading) {
      lenis.stop(); // freeze scroll
    } else {
      lenis.start(); // enable scroll
      lenis.scrollTo(0, { immediate: true }); // reset position
    }
  }, [isLoading, lenis]);

  /* ---------------- Block render until preload done ---------------- */
  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="bg-black overflow-hidden">
      <ReactLenis root>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
        <Footer />
      </ReactLenis>
    </div>
  );
};

export default App;
