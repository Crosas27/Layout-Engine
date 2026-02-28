// ===============================
// Layout Engine V1 - app.js
// ===============================

import {
  loadProject,
  saveProject,
  addWall
} from "./projectManager.js";

let project;
let currentWallIndex = 0;
let isDirty = false;

// -------------------------------
// Boot App
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {

  console.log("App booting...");

  // Load project safely
  project = loadProject();

  // Ensure at least one wall exists
  if (project.walls.length === 0) {
    addWall(project, { name: "Wall 1" });
    saveProject(project);
  }

  currentWallIndex = 0;

  wireUI();

  console.log("App ready.");

});


// -------------------------------
// Wire UI Events
// -------------------------------
function wireUI() {

  const renderBtn = document.getElementById("renderBtn");
  const saveBtn = document.getElementById("saveBtn");

  if (renderBtn) {
    renderBtn.addEventListener("click", handleRender);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveProject(project);
      isDirty = false;
      console.log("Project saved.");
    });
  }
}


// -------------------------------
// Handle Render
// -------------------------------
function handleRender() 

{ console.log("Render button clicked");
 
  const wall = project.walls[currentWallIndex];

  if (!wall) {
    console.warn("No wall found.");
    return;
  }

  wall.length = parseFloat(document.getElementById("wallLength")?.value) || 0;
  wall.panelCoverage = parseFloat(document.getElementById("panelCoverage")?.value) || 0;
  wall.ribSpacing = parseFloat(document.getElementById("ribSpacing")?.value) || 0;
  wall.offset = parseFloat(document.getElementById("offset")?.value) || 0;
  wall.threshold = parseFloat(document.getElementById("threshold")?.value) || 0;

  renderRibs(wall);

  isDirty = true;

  console.log("Render complete.");
}

function calculateRibs(wall) {

  const ribs = calculateRibs(wall);

console.log("Ribs:", ribs);

  const length = wall.length || 0;
  const spacing = wall.ribSpacing || 0;
  const offset = wall.offset || 0;

  if (spacing <= 0) {
    console.warn("Invalid rib spacing.");
    return ribs;
  }

  let position = offset;
  let index = 1;

  while (position <= length) {

    ribs.push({
      index: index,
      position: parseFloat(position.toFixed(4)) // keeps floating point clean
    });

    position += spacing;
    index++;
  }

  return ribs;
}

// -------------------------------
// Stub Render Function (Temporary)
// -------------------------------
function renderRibs(wall) {
  console.log("Rendering wall:", wall);
}
