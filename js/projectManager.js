// ===============================
// Project Manager - Layout Engine V1
// ===============================

const STORAGE_KEY = "layoutProject";

// -------------------------------
// Default Project Structure
// -------------------------------
function createEmptyProject() {
  return {
    name: "Untitled Project",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    walls: []
  };
}

// -------------------------------
// Load Project (Safe)
// -------------------------------
export function loadProject() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return createEmptyProject();
  }

  try {
    const parsed = JSON.parse(data);

    // Safety check in case structure changes later
    if (!parsed.walls) {
      parsed.walls = [];
    }

    return parsed;

  } catch (err) {
    console.error("Corrupted project data. Resetting.");
    return createEmptyProject();
  }
}

// -------------------------------
// Save Project
// -------------------------------
export function saveProject(project) {
  project.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
}

// -------------------------------
// Clear Project (New File)
// -------------------------------
export function resetProject() {
  const fresh = createEmptyProject();
  saveProject(fresh);
  return fresh;
}

// -------------------------------
// Add Wall
// -------------------------------
export function addWall(project, wallData) {
  const wall = {
    id: crypto.randomUUID(),
    name: wallData.name || `Wall ${project.walls.length + 1}`,
    length: wallData.length || 0,
    ribSpacing: wallData.ribSpacing || 0,
    offset: wallData.offset || 0,
    createdAt: new Date().toISOString()
  };

  project.walls.push(wall);
  return wall;
}

// -------------------------------
// Clone Wall
// -------------------------------
export function cloneWall(project, wallId) {
  const existing = project.walls.find(w => w.id === wallId);
  if (!existing) return null;

  const clone = {
    ...existing,
    id: crypto.randomUUID(),
    name: existing.name + " (Clone)",
    createdAt: new Date().toISOString()
  };

  project.walls.push(clone);
  return clone;
}

// -------------------------------
// Delete Wall
// -------------------------------
export function deleteWall(project, wallId) {
  const index = project.walls.findIndex(w => w.id === wallId);
  if (index === -1) return false;

  project.walls.splice(index, 1);
  return true;
}

// -------------------------------
// Get Wall By ID
// -------------------------------
export function getWall(project, wallId) {
  return project.walls.find(w => w.id === wallId) || null;
}
