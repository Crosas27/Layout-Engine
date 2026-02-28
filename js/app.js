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
function handleRender() {

  console.log("Render button clicked");

  const wall = project.walls[currentWallIndex];

  console.log("Wall before update:", wall);

  wall.length = parseFloat(document.getElementById("wallLength")?.value) || 0;
  wall.panelCoverage = parseFloat(document.getElementById("panelCoverage")?.value) || 0;
  wall.ribSpacing = parseFloat(document.getElementById("ribSpacing")?.value) || 0;
  wall.offset = parseFloat(document.getElementById("offset")?.value) || 0;
  wall.threshold = parseFloat(document.getElementById("threshold")?.value) || 0;

  console.log("Wall after update:", wall);

  const ribs = calculateRibs(wall);

  console.log("Calculated ribs:", ribs);

  isDirty = true;

  console.log("Render complete.");
}


// -------------------------------
// Stub Render Function (Temporary)
// -------------------------------
function renderRibs(wall) {
  console.log("Rendering wall:", wall);
}
