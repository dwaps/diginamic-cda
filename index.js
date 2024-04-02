// SELECTION TEXT
const SELECTED_KEY = "selected-text";

const btnCopySelection = document.querySelector(".bt-copy-selection");
const btnZoomIn = document.querySelector(".bt-zoom-in");
const textZoomedDialog = buildModalOfSelectedText();

window.addEventListener("mouseup", (e) => {
  selectedText = getSelection().toString().trim();

  if (selectedText) {
    localStorage.setItem(SELECTED_KEY, selectedText);
    setPosition(btnCopySelection, e.pageX, e.pageY);
    setPosition(btnZoomIn, e.pageX - 50, e.pageY);
    showTag(btnCopySelection);
    showTag(btnZoomIn);
  } else {
    showTag(btnCopySelection, false);
    showTag(btnZoomIn, false);
  }
});

btnCopySelection.addEventListener("click", () => {
  selectedText = localStorage.getItem(SELECTED_KEY);
  if (selectedText) {
    navigator.clipboard.writeText(selectedText);
    btnCopySelection.classList.add("copied");
    setTimeout(() => btnCopySelection.classList.remove("copied"), 700);
  }
});

btnZoomIn.addEventListener("click", (e) => {
  selectedText = localStorage.getItem(SELECTED_KEY);

  if (selectedText) {
    textZoomedDialog.classList.add("selected-text-zoomed");
    textZoomedDialog.innerText = selectedText;
    textZoomedDialog.showModal();
  } else {
    textZoomedDialog.classList.remove("selected-text-zoomed");
    textZoomedDialog.innerText = "";
    textZoomedDialog.close();
  }
});

// BUTTON TO TOP
const btnToTop = document.querySelector(".bt-back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) btnToTop.classList.add("showIt");
  else btnToTop.classList.remove("showIt");
});

btnToTop.addEventListener("click", () => window.scrollTo(0, 0));

// FUNCTIONS
function buildModalOfSelectedText() {
  const modal = document.createElement("dialog");
  modal.onclick = () => modal.close();
  btnZoomIn.after(modal);
  return modal;
}

function setPosition(el, left, top) {
  el.style.left = left + "px";
  el.style.top = top + "px";
}

function showTag(el, yes = true) {
  if (yes) {
    el.classList.add("showIt");
  } else {
    el.classList.remove("showIt");
  }
}
