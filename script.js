window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
  }, 2000); // 2 seconds
});
