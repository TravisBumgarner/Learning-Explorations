const fetchGeneralResults = query => {
  const results = [
    {
      text: "python",
      type: "query"
    },
    {
      text: "python fundamentals",
      type: "query"
    },
    {
      text: "Advanced Python",
      type: "course"
    },
    {
      text: "Bob Python",
      type: "author"
    }
  ].filter(({ text }) => text.toLowerCase().includes(query));

  return results;
};

const updateAutocomplete = event => {
  const ulResults = document.getElementById("autocomplete-results");
  ulResults.innerHTML = "";

  const query = event.srcElement.value;
  if (!query) return;

  const results = fetchGeneralResults(query);

  results.forEach(({ type, text }) => {
    const node = document.createElement("li");
    node.innerHTML = `<strong>${text}</strong> [${type}]`;
    ulResults.append(node);
  });
};

document.getElementById("autocomplete-input").addEventListener("keyup", () => {
  const autocompleteInput = document.getElementById("autocomplete-input");
  const resultsWrapper = document.getElementById("results-wrapper");
  resultsWrapper.style.display = autocompleteInput.value ? "block" : "none";
});

document
  .getElementById("autocomplete-input")
  .addEventListener("focusout", () => {
    const resultsWrapper = document.getElementById("results-wrapper");
    resultsWrapper.style.display = "none";
  });

document
  .getElementById("autocomplete-input")
  .addEventListener("keyup", updateAutocomplete);
