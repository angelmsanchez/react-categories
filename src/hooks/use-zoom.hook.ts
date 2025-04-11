import { useState } from "react";

export const useZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  return {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
  };
};
