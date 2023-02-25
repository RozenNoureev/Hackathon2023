var data;


let promise = new Promise(function(resolve, reject){
  fetch("./fakeData.csv")
  .then(response => response.text())
  .then((input) => {
    data = input;
    resolve();
  })
})


async function format(){
  var dict = {}
  let result = await promise;
  console.log(data);

  const rows = data.split("\n");
  console.log(rows);
  const day = 1;
// const gData = [...Array(N).keys()].map(() => ({
//   lat: (Math.random() - 0.5) * 180,
//   lng: (Math.random() - 0.5) * 360,
//   size: Math.random() / 3,
//   color: ['purple', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
// }));

  for(let row of rows){
    let arr = row.split(",");
    console.log(arr)
    for(let i=0; i < arr.length; i+=3){
      dict[arr[i]] = [arr[i+1], arr[i+2]];
    }
  }
  console.log(Object.keys(dict).length);
  for (const key of Object.keys(dict)) {
    console.log(key + ":" + dict[key])
}
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

          setTimeout(() => {
            setTransitionDuration(1000);
            setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-6));
          }, 3000);
        });
    }, []);

    useEffect(() => {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;

      globeEl.current.pointOfView({ altitude: 4 }, 5000);
    }, []);

    return <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"

      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.05}
      hexPolygonAltitude ={altitude}
      hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
      hexPolygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${d.POP_EST}</i>
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