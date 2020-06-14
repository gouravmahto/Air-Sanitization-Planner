
// Logical model
workspaceW = 210;
workspaceH = workspaceW;

cameraLocation = [0, 0];
cameraAngle = 180;
maxDistanceFromCameraInWorkspace = Math.max(workspaceW, workspaceH) / 2;
renderCameraDirection = true;
renderCameraFov = true;

inputList = [
  // {"x": 5, "y": 5, "z": 10},
  // {"x": 0, "y": 0, "z": 20}
]

function updateMouseGrid(gridPack)
{
  grid = gridPack["grid"]
  statusGrid = gridPack["statusGrid"]
  d = [];
  for (i in grid)
  {
    for (j in grid[i]) {
      // if (grid[i][j] > 0)
      if (statusGrid != null)
        d.push({"x": j, "y": i, "z": grid[i][j], "done": statusGrid[j][i]});
      else
        d.push({"x": j, "y": i, "z": grid[i][j], "done": false});
    }
  }
  inputList = d;
}

// Rendering

// let carModel;
let roadTexture;
function preload()
{
  // carModel = loadModel('models/model_sedancar.obj');
  roadTexture = loadImage('assets/roadTexture.jpg');
}


let univW;
let univH;

let minDim;

let multiplierW;
let multiplierH;
let multiplierZ;

let maxDistanceFromCameraInUniv;
let minDistanceFromCameraGap;
function setup() {
  univW = window.innerWidth;
  univH = window.innerHeight;

  minDim = Math.min(univW, univH);

  multiplierW = minDim / 400;
  multiplierH = minDim / 400;
  multiplierZ = minDim / 400;

  maxDistanceFromCameraInUniv = maxDistanceFromCameraInWorkspace * Math.max(multiplierW, multiplierH);
  minDistanceFromCameraGap = 10 * multiplierW;

  createCanvas(univW, univH, WEBGL);
  eyeZ = ((height/2.0) / tan(PI*60.0/360.0));
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

var xRotate = 1.1;
var yRotate = 0;
var pointLightBrightness = 150;

function draw() {
  ambientLight(140);

  pointLight(pointLightBrightness, 
    pointLightBrightness, 
    pointLightBrightness, 0, -univH, 150);

  pointLight(pointLightBrightness, 
    pointLightBrightness, 
    pointLightBrightness, 0, univH, 150);
  
  skybox();
  push();
  rotateX(xRotate);
  rotateZ(yRotate);
  plotData();
  pop();
}

function mouseDragged() {
  if (mouseButton === LEFT)
  {
    xRotate -= movedY / 150;
    yRotate += movedX / 100;
  }
}

function doubleClicked() {
  xRotate = 1;
  yRotate = 0;
}

function plotData()
{
  fill(color(160,82,45));
  noStroke();
  texture(roadTexture);
  push();
  translate(- workspaceW * multiplierW / 20, 
    - workspaceW * multiplierW / 20);
  box(workspaceW * multiplierW, 
      workspaceH * multiplierH,
      10 * multiplierZ);
  // plotCameraSprite();
  pop();
  plotApiData();
}

function plotApiData()
{
  redColor = color(230,69,0, 255);
  orangeColor = color(255,140,0, 255);
  greenColor = color(173,255,47, 255);
  blueColor = color(47,173,255, 255);
  outlineColor = color(255,255,255, 190);
  
  // dimW = apiInput.width;
  // dimH = apiInput.height;
  for (el of inputList)
  {
    push();
    selColor = blueColor;
    if (el.done)
      selColor = greenColor;

    //stroke(outlineColor);
    noStroke();
    translate(-workspaceW * multiplierW / 2, - workspaceW * multiplierW / 2);
    x = el.x * workspaceW * multiplierW / 10;
    y = el.y * workspaceW * multiplierW / 10;
    z = el.z * workspaceW * multiplierW / 60;
    plotCar(x, y, z, selColor);
    pop();
  }
}


function plotCar(x, y, z, selColor)
{
  push();
  translate(x, y, 7 * multiplierZ + z / 2);
  var d = workspaceW * multiplierW / 11;
  fill(selColor);
  box(d, d, z);
  pop();
}

function skybox()
{
  background(135,206,250);
}
