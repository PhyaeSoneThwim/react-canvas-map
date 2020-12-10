import React from "react";
import ReactDOM from "react-dom";

import Map from "./Map";
import { MAP } from "./Map/constants";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Map
        data={{
          map: MAP,
          width: 600,
          height: 500,
          center: [-70, -38],
          scale: 380,
          currency: "CLP",
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
