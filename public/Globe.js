var data;
var dict = {}

let promise = new Promise(function(resolve, reject){
  fetch("./fakeData.csv")
  .then(response => response.text())
  .then((input) => {
    data = input;
    resolve();
  })
})



async function format(){
  let result = await promise;

  const rows = data.split("\n");
  var day = 0;
// const gData = [...Array(N).keys()].map(() => ({
//   lat: (Math.random() - 0.5) * 180,
//   lng: (Math.random() - 0.5) * 360,
//   size: Math.random() / 3,
//   color: ['purple', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
// }));
  setInterval(function () {
    
    let arr = rows[day].split(",");
    for(let i=0; i < arr.length; i+=3){
      dict[arr[i]] = arr[i+1];
    }
    day = (day+1)%(rows.length-1);
  }, 1000);

  //features, list, properties, name

  /*  for(let row of rows){
    let arr = row.split(",");
    for(let i=0; i < arr.length; i+=3){
      dict[arr[i]] = [arr[i+1], arr[i+2]];
    }
  }*/
  //console.log(Object.keys(dict).length);
  //for (const key of Object.keys(dict)) {
  //  console.log(key + ":" + dict[key])
  //}
};


format();
// ReactDOM.render(

//   <Globe
//     globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
    
//   />,
//   document.getElementById('globeViz')
// );



////////////////////////////////////////////////////////////
// const { useState, useEffect } = React;

//   const World = () => {
//     const [countries, setCountries] = useState({ features: []});

//     useEffect(() => {
//       // load data
//       fetch('./countryData.geojson').then(res => res.json()).then(setCountries);
//     }, []);

//     return <Globe
//       globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"

//       hexPolygonsData={countries.features}
//       hexPolygonResolution={3}
//       hexPolygonMargin={0.0}
//       hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
//       hexPolygonLabel={({ properties: d }) => `
//         <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
//         Population: <i>${d.POP_EST}</i>
//       `}
//     />;
//   };

//   ReactDOM.render(
//     <World />,
//     document.getElementById('globeViz')
//   );
//

/////////////////////////////////////////////////////////////////
const { useState, useEffect, useRef } = React;

  const World = () => {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: []});
    const [altitude, setAltitude] = useState(0.1);
    const [transitionDuration, setTransitionDuration] = useState(1000);

    useEffect(() => {
      // load data
      fetch('./countryData.geojson').then(res => res.json())
        .then(countries=> {
          setCountries(countries);
          console.log(countries.features);
          
          /*setInterval = (feat) => {
            const name = feat.properties.NAME;
            const altitudeFromDict = Math.max(dict[name][0]*1000000000, 0.1);
            setAltitude(altitudeFromDict);
          }*/
          setTimeout(() => {
            setTransitionDuration(1000);
            //setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-6));
            setAltitude(() => feat => {
              console.log(countries.toString())
              Math.max(0.1, dict[countries.features.properties.NAME]*7e-6)
            });
            //setAltitude(dict[countries.features[0].properties.NAME][0])
          }, 3000);
        });
    }, []);

    useEffect(() => {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;

      globeEl.current.pointOfView({ altitude: 2 }, 5000);
    }, []);
    let scale = 40;

    
    //countries.features[0].properties.NAME
    
    return <Globe
      height = {window.innerHeight-23} 
      width = {window.innerWidth}
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"

      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.05}
      hexPolygonAltitude ={altitude}
    //  onHexPolygonHover
      hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
      hexPolygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Infected: <i>${dict[countries.features[0].properties.NAME]}</i>
       `}

      // polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
      // polygonAltitude={altitude}
      // polygonCapColor={() => 'rgba(200, 0, 0, 0.7)'}
      // polygonSideColor={() => 'rgba(255, 255, 255, 0.12)'}
      // polygonLabel={({ properties: d }) => `
      //   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
      //   Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
      // `}
      //polygonsTransitionDuration={transitionDuration}
    />; 
  };

  ReactDOM.render(
    <World />,
    document.getElementById('globeViz')
  );