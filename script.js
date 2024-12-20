//get movie container

const moviesContaner = document.querySelector(".container");

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=b6a64b8e88e90da1acd2295797cbcde7&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w200/";

const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=b6a64b8e88e90da1acd2295797cbcde7&query="';

// get search form

const form = document.getElementById("form");
// get input element

const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

// get json file from sourse

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json(res);
  showMovies(data.results);
}

function showMovies(arreyOfMoviesObjs) {
  moviesContaner.innerHTML = "";
  const movieCard = arreyOfMoviesObjs
    .map((obj) => {
      return `
      <div class="movie-card">
        <div class="movie-poster">
          <img
            src="https://image.tmdb.org/t/p/w500/${obj.poster_path}"
            alt="${obj.title + "poster"}"
          />
        </div>
        <div class="movie-info">
          <h2 class="movie-title">${obj.title}</h2>
          <p class="movie-rating">Rating: ⭐ ${parseFloat(
            obj.vote_average.toFixed(1)
          )}/10</p>
          <p class="movie-description">
           ${obj.overview}
          </p>
        </div>
      </div>`;
    })
    .join("");

  // convert html string to real html element

  const htmlMovieCard = document
    .createRange()
    .createContextualFragment(movieCard);

  // append html movie to container ;

  moviesContaner.appendChild(htmlMovieCard);
}
