document.addEventListener("DOMContentLoaded", function () {
  const data = {
    poster: localStorage.getItem("poster"),
    backdrop_path: localStorage.getItem("backdrop_path"),
    title: localStorage.getItem("title"),
    original_title: localStorage.getItem("original_title"),
    overview: localStorage.getItem("overview"),
    popularity: localStorage.getItem("popularity"),
    release_date: localStorage.getItem("release_date"),
    average: localStorage.getItem("average"),
    navBar: localStorage.getItem("navBar"),
    video_src: localStorage.getItem("video_src"),
    video_src2: sessionStorage.getItem("video_src2"),
    id: localStorage.getItem("id"),
  };

  function updateDOM(data) {
    if (data.poster) {
      document.getElementById(
        "poster"
      ).src = `https://image.tmdb.org/t/p/w500/${data.poster}`;
    }
    if (data.backdrop_path) {
      document.getElementById(
        "backdrop_path"
      ).src = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
    }
    if (data.title) {
      document.getElementById("title").textContent = data.title;
    }
    if (data.original_title) {
      document.getElementById(
        "original_title"
      ).textContent = `${data.original_title}: Original Title`;
    }
    if (data.overview) {
      document.getElementById(
        "overview"
      ).textContent = `Overview : ${data.overview.slice(0, 250)}`;
    }
    if (data.popularity) {
      document.getElementById(
        "popularity"
      ).textContent = `Popularity : ${data.popularity}`;
    }
    if (data.release_date) {
      document.getElementById(
        "release_date"
      ).textContent = `Release date : ${data.release_date}`;
    }
    if (data.average) {
      document.getElementById(
        "average"
      ).textContent = `Average Vote : ${data.average}`;
    }
    if (data.navBar) {
      document.getElementById("navBar").innerHTML = data.navBar;
    }
    if (data.video_src2) {
      document.getElementById(
        "videoContainer"
      ).innerHTML = `<iframe width="560" height="315" src="${data.video_src2}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      document.getElementById("videoContainer").innerHTML =
        "لا يوجد فيديو متاح.";
    }
  }

  updateDOM(data);
  // sessionStorage.clear();
});
