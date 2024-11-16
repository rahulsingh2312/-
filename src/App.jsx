import { useState } from "react";

import SwapYen from "./components/swapYen";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full flex items-center">
        <SwapYen />
      </div>
    </>
  );
}

export default App;
