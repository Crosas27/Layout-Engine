let project = loadProject();
let currentWallIndex = 0;
let isDirty = false;

function loadProject() {
  const data = localStorage.getItem("layoutProject");
  if (!data) {
    return {
      walls: []
    };
  }
  return JSON.parse(data);
}

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
