window.addEventListener("load", function () {

  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");

  // Check if loader already shown in this tab
  if (sessionStorage.getItem("loaderShown")) {
    loader.style.display = "none";
    main.classList.remove("hidden");
  } else {
    setTimeout(() => {
      loader.style.display = "none";
      main.classList.remove("hidden");
      sessionStorage.setItem("loaderShown", "true");
    }, 2000);
  }

});
