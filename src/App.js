import './App.css';
import React from 'react';
import ReactGlobe from 'react-globe.gl';

function MyGlobe() {
  // support rendering markers with simple data
  

  // simple component usage
  return (
    <ReactGlobe
    options={{
      enableGlobeGlow: true,
      globeGlowCoefficient: 0.1,
      globeGlowColor: 'gold',
      globeGlowPower: 4,
      globeGlowRadiusScale: 0.5,
    }}
  />
  )
}
export default MyGlobe;
