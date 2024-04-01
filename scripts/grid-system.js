deleteOutboundingCols();
window.addEventListener("resize", deleteOutboundingCols);

function deleteOutboundingCols() {
  document.querySelectorAll(".row").forEach((row, i) => {
    let realNbOfColsExpansion = 0; // Certains el font plusieurs cols et ont un décalage en colonne
    [...row.children].forEach((col, i) => {
      if (getComputedStyle(col).display === "none") {
        return;
      }

      realNbOfColsExpansion += computeTotalRealCols(col);
      if (realNbOfColsExpansion > 12) {
        col.hidden = true;
      }
    });
  });
}

function computeTotalRealCols(col) {
  const classColOffset = col.className.match(/col-offset/);
  const classColNb = col.className.match(/col-\d+/);
  const classCol = col.className.match(/(col[^-]|col$)/);

  let totalCols = 0;

  if (classColOffset && classColOffset.index) {
    totalCols += +col.className.substring(
      classColOffset.index + 11,
      classColOffset.index + 12
    );
  }

  if (classColNb && classColNb.index > -1) {
    totalCols += +col.className.substring(
      classColNb.index + 4,
      classColNb.index + 5
    );
  }

  if (classCol && classCol.index > -1) {
    totalCols += 1;
  }

  return totalCols;
}

// DEBUG PART
const btDebug = document.createElement("button");
const grid = document.querySelector(".grid");
const imgDebug = new Image();

btDebug.className = "debug";
document.body.appendChild(btDebug);

imgDebug.src = "./images/debug.png";
imgDebug.alt = "Toggle debug mode";
btDebug.appendChild(imgDebug);

btDebug.onclick = () => {
  grid.classList.toggle("debug");
};
