// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// // Import Leaflet's CSS to style the map
// import 'leaflet/dist/leaflet.css'; // Ensure Leaflet styles are applied

// import {BrowserRouter} from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import Leaflet's CSS to style the map
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet styles are applied

import {BrowserRouter} from 'react-router-dom'

// Catch silent React crashes and show them as a pop-up on your phone
window.onerror = function(message) {
  alert("CRASH: " + message);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
