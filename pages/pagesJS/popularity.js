

const PopularMovies = (function() {
  let currentPage = 1;
  const apiKey = "724fa79eddb78094bf31242df4a56d93";
  const youtubeApiKey = "AIzaSyAYjh_9bTwrrncv2ENpEGSYKHtgJjv4QJY";
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&sort_by=popularity.desc&page=`;
  const maxMoviesPerPage = 14;
  let moviesList;

  function fetchMovies(page) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl + page);
    xhr.send();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        moviesList = JSON.parse(xhr.response).results;
        displayMovies();
      }
    });
  }

  function displayMovies() {
    let container = "";
    for (let i = 0; i < Math.min(moviesList.length, maxMoviesPerPage); i++) {
      container += `
            <div class="div-card w-100">  
              <a href="pageMove.html" class="btn-popular" data-popular-index="${i}">
                <img src="https://image.tmdb.org/t/p/w500/${moviesList[i].poster_path}" class="w-100">
              </a>
              <h5>${moviesList[i].title}</h5>
              <hr>
              <span class="span-star">${Number(moviesList[i].vote_average.toFixed(1))} <i class="fa-solid fa-star star"></i></span>
              <span>${moviesList[i].release_date.slice(0, 4)}</span>
              <p>${moviesList[i].popularity} <i class="fa-solid fa-eye"></i></p>
            </div>
      `;
    }
    document.getElementById("popularity").innerHTML = container;
    attachTrailerEvents();
  }

  function fetchYouTubeTrailer(query, callback) {
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query} official trailer&key=${youtubeApiKey}`;
    fetch(youtubeApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const videoId = data.items[0]?.id?.videoId;
        if (videoId) {
          const videoUrl = `https://www.youtube.com/embed/${videoId}`;
          callback(videoUrl);
        } else {
          console.log("No trailer found for the movie.");
        }
      })
      .catch((error) => console.error("Error fetching trailer:", error));
  }

  function saveMovieToLocalStorage(movie, videoUrl) {
    localStorage.setItem("poster", movie.poster_path);
    localStorage.setItem("backdrop_path", movie.backdrop_path);
    localStorage.setItem("title", movie.title);
    localStorage.setItem("original_title", movie.original_title);
    localStorage.setItem("overview", movie.overview);
    localStorage.setItem("popularity", movie.popularity);
    localStorage.setItem("average", Number(movie.vote_average.toFixed(1)));
    localStorage.setItem("release_date", movie.release_date);
    localStorage.setItem("id", movie.id);
    sessionStorage.setItem("video_src2", videoUrl);
    console.log("Movie data and trailer URL stored in localStorage.");
  }

  function attachTrailerEvents() {
    const films = document.querySelectorAll(".btn-popular");
    films.forEach((film) => {
      film.addEventListener("click", function (event) {
        event.preventDefault();
        const index = this.getAttribute("data-popular-index");
        const selectedMovie = moviesList[index];
        if (selectedMovie) {
          fetchYouTubeTrailer(selectedMovie.title, (videoUrl) => {
            saveMovieToLocalStorage(selectedMovie, videoUrl);
            window.location.href = "http://127.0.0.1:5500/pageMove.html";
          });
        } else {
          console.log("Movie not found in the list.");
        }
      });
    });
  }

  document.getElementById('nextPopularityButton').addEventListener('click', function () {
    currentPage++;
    fetchMovies(currentPage);
  });

  fetchMovies(currentPage);

  return {
    fetchMovies: fetchMovies
  };
})();
