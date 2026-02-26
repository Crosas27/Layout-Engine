let project = null;
let currentWallIndex = 0;
let isDirty = false;

function createNewProject(name) {
  project = {
    id: crypto.randomUUID(),
    name,
    walls: [],
    lastSaved: null
  };
}

function addWall(wallData) {
  project.walls.push({
    id: crypto.randomUUID(),
    ...wallData
  });
  currentWallIndex = project.walls.length - 1;
  isDirty = true;
}