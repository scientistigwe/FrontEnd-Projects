//Link event listener to toggle button
document
  .getElementById("eventListenerToggleBtn")
  .addEventListener("click", function () {
    handleButtonClick(this, eventListenerCallbackFunc);
  });
