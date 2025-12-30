import React from "react";
import Home from "./pages/Home";
import { ReactLenis, useLenis } from "lenis/react";

const App = () => {
  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });

  return (
    <div className="bg-black overflow-hidden overflow-y-hidden">
      <ReactLenis root>
        <Home />
      </ReactLenis>
    </div>
  );
};

export default App;
