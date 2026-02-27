import {
  loadProject,
  saveProject,
  addWall
} from "./projectManager.js";

let project;
let currentWallIndex = 0;
let isDirty = false;

document.addEventListener("DOMContentLoaded", () => {

  project = loadProject();

  const renderBtn = document.getElementById("renderBtn");

  if (renderBtn) {
    renderBtn.addEventListener("click", () => {

      const wall = project.walls[currentWallIndex];

      wall.length = parseFloat(document.getElementById("wallLength").value);
      wall.panelCoverage = parseFloat(document.getElementById("panelCoverage").value);
      wall.ribSpacing = parseFloat(document.getElementById("ribSpacing").value);
      wall.offset = parseFloat(document.getElementById("offset").value);
      wall.threshold = parseFloat(document.getElementById("threshold").value);

      renderRibs(wall);
      isDirty = true;

    });
  }

});