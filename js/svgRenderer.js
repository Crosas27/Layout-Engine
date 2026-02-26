function renderRibs(wall) {
  const svg = document.getElementById("ribMap");
  svg.innerHTML = "";

  const ribs = generateRibPositions(wall);

  const width = wall.length;
  svg.setAttribute("viewBox", `0 0 ${width} 100`);

  ribs.forEach((pos, index) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", pos);
    line.setAttribute("x2", pos);
    line.setAttribute("y1", 0);
    line.setAttribute("y2", 100);
    line.setAttribute("stroke", "currentColor");

    if (index % 3 === 0) {
      line.setAttribute("stroke-width", "2");
    } else {
      line.setAttribute("stroke-width", "1");
    }

    svg.appendChild(line);
  });
}