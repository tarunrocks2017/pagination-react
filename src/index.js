import React from "react";
import { createRoot } from "react-dom/client";
// src/index.js or src/index.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);