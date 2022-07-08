const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

// Getting Elements
const form = document.querySelector('#form');
const main = document.querySelector('.main');
const search = document.querySelector('.search');



getMovie(API_URL);
async function getMovie(url) {
    const response = await fetch(url);
    const data = await response.json();
    const test = data.results;
    showMovies(test)
}
function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const {original_title, overview, poster_path, vote_average} = movie;
        const movieEl = document.createElement("div");
        movieEl.className = "movie";
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${poster_path}">
                <div class="movie-info">
                    <h3>${original_title}</h3>
                    <span class="${getCorrectClass(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>OverView:</h3>
                    <p>${overview}</p>
                </div>
            </div>
        `;
        main.appendChild(movieEl)
    });
}
function getCorrectClass(vote) {
    if(vote >= 8) {
        return "green"
    } else if(vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}
form.addEventListener('submit', e => {
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm)
        search.value = "";
    } else {
        window.location.reload();
    }
    e.preventDefault();
})

showMovies(moviesArray);