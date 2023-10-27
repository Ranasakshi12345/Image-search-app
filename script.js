const accessKey = "tGki7ShonMVZqYz0cEZNCnq3mGbNDjovi2cXuT7B2jw";

const FormE1 = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageConatiner = document.createElement("div");
    imageConatiner.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt= result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // Append all elements in a single line of code using appendChild method
    imageLink.appendChild(image);
    searchResults.appendChild(imageLink);
    image.appendChild(imageConatiner);

    showMore.style.display = "block";
  });
}

// Add the parameter 'e' to the event listener function
FormE1.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  page++;
  searchImages();
});
