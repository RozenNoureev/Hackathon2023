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
ReactDOM.render(

  <Globe
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
    
  />,
  document.getElementById('globeViz')
);