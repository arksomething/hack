// import React, { useState, useEffect } from "react";
// import html2canvas from "html2canvas";

// const App = () => {
//   const [dom, setDom] = useState('');

//   useEffect(() => {
//     // Request the DOM from the content script
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "getDOM" }, (response) => {
//         if (response && response.dom) {
//           setDom(response.dom); // Set the DOM received
//         }
//       });
//     });
//   }, []);

//   const captureScreenshot = () => {
//     if (dom) { // Check if ref is not null
//       html2canvas(dom, { useCORS: true }).then((canvas) => {
//         const dataURL = canvas.toDataURL("image/png");

//         // Create a link element for downloading the screenshot
//         const a = document.createElement("a");
//         a.href = dataURL;
//         a.download = "screenshot.png"; // Set the download filename
//         a.textContent = "DOWNLOAD"; // For debugging, if you want to see the link

//         // Append, trigger the download, and remove the link
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       });
//     } else {
//       console.error("ToCaptureRef is null, cannot capture screenshot");
//     }
//   };

//   return (
//     <div>
//       <h1>Capturer</h1>
//       <img
//         alt="temp"
//         style={{ width: "500px" }}
//         src="https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//       />
//       <button onClick={captureScreenshot}>Take Screenshot</button>
//     </div>
//   );
// };

import React from 'react';
import CaptureHTML from './CaptureHTML';

const App = () => {
  return <CaptureHTML />;
};

export default App;