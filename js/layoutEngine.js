function generateRibPositions(wall) {
  const ribs = [];
  let pos = wall.offset;

  while (pos <= wall.length) {
    ribs.push(pos);
    pos += wall.ribSpacing;
  }

  return ribs;
}