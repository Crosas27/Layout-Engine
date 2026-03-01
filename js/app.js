import { loadProject, saveProject, addWall } from "./projectManager.js";

let project;
let currentWallIndex = 0;
let isDirty = false;

document.addEventListener("DOMContentLoaded", () => {
  project = loadProject();
  wireUI();
});

function displayRibs(ribs) {

  const container = document.getElementById("ribOutput");

  if (!container) return;

  if (ribs.length === 0) {
    container.innerHTML = "<p>No ribs calculated.</p>";
    return;
  }

  let html = "<h3>Rib Layout</h3><ul>";

  ribs.forEach(rib => {
    html += `<li>Rib ${rib.index} — ${rib.position}"</li>`;
  });

  html += "</ul>";

  container.innerHTML = html;
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
