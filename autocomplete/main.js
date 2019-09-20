const fetchData = () => {
  const results = [];
  const datalist = document.getElementById("autocomplete-results");
  results.forEach(result => {
    const node = document.createElement("option");
    node.value = result;
    datalist.append(node);
  });
};

fetchData();

document.getElementById("autocomplete-input").addEventListener("focus", () => {
  const resultsWrapper = document.getElementById("results-wrapper");
  resultsWrapper.style.display = "block";
});

document
  .getElementById("autocomplete-input")
  .addEventListener("focusout", () => {
    const resultsWrapper = document.getElementById("results-wrapper");
    resultsWrapper.style.display = "none";
  });
