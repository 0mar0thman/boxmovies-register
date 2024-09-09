
const apiKey = "bd27fabd4f448617eb4ef4dd33c7b66a";
document.getElementById("searchInput").addEventListener("keyup", function () {
  const query = this.value.trim();
  if (query.length > 0) {
    searchMovies(query);
  } else {
    document.getElementById("searchResults").innerHTML = "";
  }
});

function searchMovies(query) { 
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        displaySearchResults(data.results);
      } else {
        document.getElementById("searchResults").innerHTML =
          "<p>لا توجد نتائج مطابقة.</p>";
      }
    })
    .catch((error) => console.error("Error fetching search results:", error));
}

function displaySearchResults(results) {
  let searchResultsContainer = "";
  const resultCountElement = document.getElementById("resultCount");

  results.forEach((movie) => {
    searchResultsContainer += `
      <div class="div-card w-100">  
        <a href="pageMove.html" onclick="storeMovieData(${encodeURIComponent(JSON.stringify(movie))})"> 
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="w-100" alt="${movie.title}">
        </a>
        <h5>${movie.title}</h5>
        <hr>
        <span class="span-star">${Number(movie.vote_average.toFixed(1))} <i class="fa-solid fa-star star"></i></span>
        <span>${movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</span>
        <p>${movie.popularity} <i class="fa-solid fa-eye"></i></p>
      </div>
    `;
  });

  resultCountElement.textContent = `تم العثور على ${results.length} نتيجة.`;
  setTimeout(() => {
    resultCountElement.textContent = ""; 
  }, 3000);

  document.getElementById("searchResults").innerHTML = searchResultsContainer;
}
