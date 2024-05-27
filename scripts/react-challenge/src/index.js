import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const container = document.getElementById("hello-world-container");
if (container) {
  // Check if the container exists
  ReactDOM.render(<App />, container);
} else {
  console.error("Container not found");
}
