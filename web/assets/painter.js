let grid;
let mouseGrid;

let zheightval = 5;

let img;
// function preload() {
  
// }

function setZ(val)
{
    zheightval = val;
}

function updateMouseGrid(data)
{
  grid = data["grid"];
  console.log("updateMouseGrid");
}

function setup() {
  noStroke();
  img = loadImage('assets/map.png');
  createCanvas(400, 400);
  
  grid = [];
  for (i = 0; i < 10; i++)
  {
    row = [];
    for (j = 0; j < 10; j++)
      row.push(0);
    grid.push(row);
  }
  
  mouseGrid = [];
  for (i = 0; i < 10; i++)
  {
    row = [];
    for (j = 0; j < 10; j++)
      row.push(0);
    mouseGrid.push(row);
  }
}

function draw() {
  background(255);
  image(img, 0, 0, 400, 400);

  cellw = width / 10;
  cellh = height / 10;
  for (i = 0; i < 10; i++)
    for (j = 0; j < 10; j++) {
      noFill();
      if (grid[i][j] > 0) {
        fill(255, 180, 180, min(255, (255 / 30) * grid[i][j]));
        rect(cellw * j, cellh * i, cellw, cellh);
      }
      
      noFill();
      if (mouseGrid[i][j] == -1) {
        fill(200, 200, 255, 100);
        noStroke();
        rect(cellw * j, cellh * i, cellw, cellh);
      }
    }
}

function mouseMoved()
{
  mi = (int)(mouseY / cellw);
  mj = (int)(mouseX / cellh);
  
  for (i = 0; i < 10; i++)
    for (j = 0; j < 10; j++)
      if (i == mi && j == mj)
        mouseGrid[i][j] = -1;
      else
        mouseGrid[i][j] = 0;
}

function mousePressed() {
  mi = (int)(mouseY / cellw);
  mj = (int)(mouseX / cellh);
  
  for (i = 0; i < 10; i++)
    for (j = 0; j < 10; j++)
      if (i == mi && j == mj)
        grid[i][j] = zheightval;
  
  // $.post("setData", grid).done(function(data) {
  //   console.log("setData");
  //   console.log(data);
  // });
  httpPost("setGrid", 'json', grid, function(data) {
    console.log("setGrid");
    console.log(data);
  });
}
