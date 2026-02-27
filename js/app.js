  import {
    loadProject,
    saveProject,
    addWall
  } from "./projectManager.js";

document.getElementById("renderBtn").addEventListener("click", () => {
  const wall = project.walls[currentWallIndex];

  wall.length = parseFloat(document.getElementById("wallLength").value);
  wall.panelCoverage = parseFloat(document.getElementById("panelCoverage").value);
  wall.ribSpacing = parseFloat(document.getElementById("ribSpacing").value);
  wall.offset = parseFloat(document.getElementById("offset").value);
  wall.threshold = parseFloat(document.getElementById("threshold").value);

  renderRibs(wall);
  isDirty = true;
});

document.addEventListener("DOMContentLoaded", () => {
   // event listeners here
});