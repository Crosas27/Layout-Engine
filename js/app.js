import { loadProject, saveProject, addWall } from "./projectManager.js";

let project;
let currentWallIndex = 0;
let isDirty = false;

document.addEventListener("DOMContentLoaded", () => {
  project = loadProject();
  wireUI();
});

function displayRibs(ribs) 
{const container = document.getElementById("ribOutput");
  if (!container) return;

  if (ribs.length === 0) {
    container.innerHTML = "<p>No ribs calculated.</p>";
    return;}

 renderSvg(wall, ribs);

  const wall = project.walls[currentWallIndex];
  const lastRib = ribs[ribs.length - 1];
  const remaining = wall.length - lastRib.position;

  let html = "<h3>Rib Layout</h3><ul>";

  ribs.forEach(rib => {
    html += `
      <li>
        <strong>Rib ${rib.index}</strong> — 
        ${formatToField(rib.position)} 
        <span style="opacity:0.6;">(${rib.position}")</span>
      </li>`;
  });

  html += "</ul>";

  html += `
    <hr>
    <div>
      <strong>Remaining:</strong> 
      ${formatToField(remaining)} 
      <span style="opacity:0.6;">(${remaining}")</span>
    </div>
  `;

  container.innerHTML = html;
}

function formatToField(inches) {

  const precision = 8; // 1/8" precision

  const totalInches = inches;

  const feet = Math.floor(totalInches / 12);
  const remainingInches = totalInches % 12;

  const wholeInches = Math.floor(remainingInches);
  let fractional = remainingInches - wholeInches;

  // Round to nearest 1/8
  let eighths = Math.round(fractional * precision);

  // Handle rollover like 11 8/8"
  if (eighths === precision) {
    eighths = 0;
    wholeInches += 1;
  }

  // Handle inch rollover like 12"
  let finalFeet = feet;
  let finalInches = wholeInches;

  if (finalInches === 12) {
    finalFeet += 1;
    finalInches = 0;
  }

  // Reduce fraction
  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  let fractionStr = "";

  if (eighths > 0) {
    const divisor = gcd(eighths, precision);
    const num = eighths / divisor;
    const den = precision / divisor;
    fractionStr = ` ${num}/${den}`;
  }

  return `${finalFeet}' ${finalInches}${fractionStr}"`;
}

function wireUI() {
  const renderBtn = document.getElementById("renderBtn");
  if (renderBtn) {
    renderBtn.addEventListener("click", handleRender);
  }
}

function handleRender() {
  console.log("Render button clicked");

  const wall = project.walls[currentWallIndex];

  wall.length = parseFloat(document.getElementById("wallLength")?.value) || 0;
  wall.ribSpacing = parseFloat(document.getElementById("ribSpacing")?.value) || 0;
  wall.offset = parseFloat(document.getElementById("offset")?.value) || 0;

  const ribs = calculateRibs(wall);

  displayRibs(ribs);
}

function calculateRibs(wall) {
  const ribs = [];

  const length = wall.length || 0;
  const spacing = wall.ribSpacing || 0;
  const offset = wall.offset || 0;

  if (spacing <= 0) return ribs;

  let position = offset;
  let index = 1;

  while (position <= length) {
    ribs.push({
      index: index,
      position: parseFloat(position.toFixed(4))
    });

    position += spacing;
    index++;
  }

  return ribs;
}

function renderSvg(wall, ribs) {

  const svg = document.getElementById("wallSvg");
  if (!svg) return;

  svg.innerHTML = ""; // clear previous render

  const wallLength = wall.length;
  const svgWidth = svg.clientWidth;
  const svgHeight = 200;

  svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  const scale = svgWidth / wallLength;

  // Draw wall outline
  const wallRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  wallRect.setAttribute("x", 0);
  wallRect.setAttribute("y", 20);
  wallRect.setAttribute("width", wallLength * scale);
  wallRect.setAttribute("height", 120);
  wallRect.setAttribute("class", "wall-outline");

  svg.appendChild(wallRect);

  // Draw ribs
  ribs.forEach(rib => {
    const xPos = rib.position * scale;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", xPos);
    line.setAttribute("y1", 20);
    line.setAttribute("x2", xPos);
    line.setAttribute("y2", 140);
    line.setAttribute("class", "rib-line");

    svg.appendChild(line);
  });
}
