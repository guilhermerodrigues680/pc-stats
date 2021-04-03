const socket = io();

socket.onAny((event, ...args) => {
  console.debug(event, args);
});

socket.on("users", (args) => {
  console.log(args);
});

socket.on("pc-stats", pcStats => {
  console.log(pcStats);
  console.log(pcStats.time, pcStats.cpu);
  x.push(new Date(pcStats.time));
  y.push(pcStats.cpu);
  const { available, total } = pcStats.space;
  console.log(available, total)
  Plotly.restyle('cpu-graph', { x: [x], y: [y] }, [0]);
  Plotly.restyle('space-graph', { values: [[available / 1e+9, total / 1e+9]] }, [0])
});

socket.on("connect_error", (err) => {
  console.error(err)
  // if (err.message === "invalid username") {
  // ...
  // }
});

document.querySelector('#btn-msg').addEventListener('click', () => {
  const msg = document.querySelector('#input-msg').value;
  const evt = socket.emit("simple-msg", msg);
  console.log('send msg', evt)
});

//

const x = [new Date()];
const y = [0];

const trace1 = {
  // x: [Date.now() + 1, Date.now() + 2, Date.now() + 3, Date.now() + 4],
  // y: [10, 15, 13, 17],
  x,
  y,
  mode: 'lines',
  name: 'CPU Usage',
  line: {
    color: 'purple',
    width: 1
  }
};

const layout = {
  title:'CPU Usage',
  yaxis: { range: [0, 1], ticksuffix: "%" }
}

Plotly.newPlot('cpu-graph', [trace1], layout);

//

var dataPie = [{
  type: "pie",
  values: [1, 2-1],
  labels: ["available", "total"],
  textinfo: "label+percent",
  insidetextorientation: "radial",
  title:'Space Usage',
}]

var layoutPie = [{
  // height: 700,
  // width: 700,
}]

Plotly.newPlot('space-graph', dataPie, layoutPie)
