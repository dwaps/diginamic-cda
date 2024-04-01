const screenInfoTag = document.querySelector(".screen-info");
let currentScreen = "";
let currentTimeout;

checkScreen();
window.addEventListener("resize", checkScreen);

function checkScreen() {
  changeCurrentScreenValue();
  if (screenInfoTag.dataset.screen != currentScreen) {
    screenInfoTag.classList.remove("displayed");
    setTimeout(() => {
      clearTimeout(currentTimeout);
      screenInfoTag.dataset.screen = currentScreen;
      screenInfoTag.classList.add("displayed");
      currentTimeout = setTimeout(
        () => screenInfoTag.classList.remove("displayed"),
        1000
      );
    }, 100);
  }
}

function changeCurrentScreenValue() {
  if (window.innerWidth <= 576) {
    currentScreen = "SMALL SCREEN";
  } else if (window.innerWidth > 576 && window.innerWidth <= 768) {
    currentScreen = "MEDIUM SCREEN";
  } else if (window.innerWidth > 768 && window.innerWidth <= 992) {
    currentScreen = "LARGE SCREEN";
  } else if (window.innerWidth > 992) {
    currentScreen = "EXTRA LARGE SCREEN";
  }
}
