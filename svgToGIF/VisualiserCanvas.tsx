import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Box } from '@mui/material';

/* -------------------------------------------------------------------------- */
/*                        Visualiser-Specific Canvases                        */
/* -------------------------------------------------------------------------- */

/**
 * The React component that renders the DOM elements that the visualiser
 * attaches itself to.
 */
const VisualiserCanvas: React.FC = () => {
  let canvasElement = useRef(null);
  let svgElement = useRef(null);

  function drawOnCanvas() {
    let canvas = canvasElement.current;
    let svg = svgElement.current;
    if (svg !== null) {
      let canvasContext = canvas.getContext('2d');
      var img = new Image();
      img.onload = function() {
          canvasContext.drawImage(img, 0, 0);
      }

      var xml = (new XMLSerializer).serializeToString(svg);
      img.src = "data:image/svg+xml;base64,"+btoa(xml);
    }
  }

  drawOnCanvas();

  return (
  <Box id="visualiser-container" margin="auto" width={window.screen.width}>
    <svg ref={svgElement} id="visualiser-canvas" />
    <canvas ref={canvasElement} id="canvas1" width="400" height="400" ></canvas>
    
  </Box>);
};

export default VisualiserCanvas;
