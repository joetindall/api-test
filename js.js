const output = document.getElementById("tiles");

window.addEventListener("load", () => {
  fetchCharcters();
});

async function fetchCharcters() {
  let fetchedResults = await fetch(
    `https://api.unsplash.com/photos/?client_id=f2-5eDcqWsht-MITtdh3LnfGguSe9BFgCmGQMfxz84s`
  );

  /* https://api.unsplash.com/search/photos?page=1&query=cats&client_id=f2-5eDcqWsht-MITtdh3LnfGguSe9BFgCmGQMfxz84s */

  let results = await fetchedResults.json();

  output.innerHTML = "";

  // For Mobile
  results.map((result) => {
    const htmlString = `
                <h2>${
                  result.description ? result.description : "No Description"
                }</h2>
                <img src="${result.urls.small}">
                <footer>
                <span><sup>By</sup><a href="https://unsplash.com/@${
                  result.user.username
                }" target="_blank">${
      result.user.username
    }</a></span><span><sup>On</sup>${result.created_at
      .substring(0, 10)
      .replace(/-/g, "/")}</span>
                </footer>`;
    let outputString = document.createElement("div");
    outputString.innerHTML = htmlString;
    outputString.classList.add("tile");
    output.appendChild(outputString);
  });

  // For Larger Devices
  results.map((result) => {
    const htmlString = `
    <div class="gradient">
    <h2>${result.description ? result.description : "No Description"}</h2>
    <footer>
      <span><sup>By</sup><a href="https://unsplash.com/@${
        result.user.username
      }" target="_blank">${
        result.user.username
      }</a></span><span><sup>On</sup>${result.created_at
      .substring(0, 10)
      .replace(/-/g, "/")}</span>
    </footer>
    </div>`;
    let outputString = document.createElement("div");
    outputString.innerHTML = htmlString;
    outputString.classList.add("tile", "large");
    outputString.style.backgroundImage = "url('" + result.urls.small + "')";

    output.appendChild(outputString);
  });
}
