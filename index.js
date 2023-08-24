// DOM elements manipulated
const searchButton = document.getElementById("search-btn")
const watchList = document.getElementById("watch-list")
const movieList = document.getElementById("movie-list")
const home = document.getElementById("home")
const homeLogo = document.getElementById("home-logo")
  

// Arrays used 
let movieDetailArray = []
let savedMovies = []


homeLogo.addEventListener("click", function() {
    location.href = "index.html"
})

// Used any time search button is clicked 
searchButton.addEventListener("click", async function(e){
    e.preventDefault()
    let searchInput = document.getElementById("search-input")
    searchInput = searchInput.value

    home.innerHTML = ""
    displayLoadingMessage()
    getMovieDetails(searchInput)
   
})

// API call to get full movie details
async function getMovieDetails(searchInput) {
    const res = await fetch(`https://www.omdbapi.com/?s=${searchInput}&plot=short&type=movie&r=json&apikey=8427e3ea`)
    const data = await res.json()

    if (data.Response === 'True') {

        let searchedMovies = data.Search
        movieDetailArray = []
        for (let movie of searchedMovies) {
            const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&plot=short&type=movie&r=json&apikey=8427e3ea`)
            const data = await res.json()
            movieDetailArray.push(data)
            console.log(data)
    
        }

        movieList.style.background = "black"
        renderMovie(movieDetailArray)
    }

    else {
    movieList.innerHTML = `<h3 class="unknown">Sorry, we couldn't find what you're looking for... Try searching something else.</h3>`
    }
}

function displayLoadingMessage() {
    movieList.innerHTML = `<p class='loading-message'>Page loading...</p>`;
  }


// Rendering HTML to the DOM
function renderMovie(movieDetailArray) {
    let movieHtml = ""
    for (let movie of movieDetailArray) {

        if (movie.Ratings.length) {
            movieHtml += `
            <img src="${movie.Poster}" id="movie-img" class="movie-img" alt="no-img-available">
            <div class="movie-items" id="movie-items">
                <div id="title" class="title">${movie.Title}</div>
                <span id="runtime" class="runtime">${movie.Runtime}</span>
                <span id="genre" class="genre">${movie.Genre}</span>
                <div class="rating"><i class="fa-sharp fa-solid fa-star"></i>${movie.Ratings[0].Value}</div>
                <div id="plot" class="plot">${movie.Plot}</div>
                <button type="button" id="${movie.imdbID}" class="add" data-add="${movie.imdbID}"><i class="fa-solid fa-plus"></i>Watchlist</button>
            </div>` 

        }

    }
    movieList.innerHTML = movieHtml

}

// Add a movie to watchlist 
document.addEventListener("click", function(e) {
    e.preventDefault()
    if (e.target.dataset.add) {
        addToWatchlist(e.target.dataset.add)
    }
})

// Add movies to local storage
function addToWatchlist(movieId) {
    const targetMovieObj = movieDetailArray.find(movie => movie.imdbID === movieId)
    savedMovies.push(targetMovieObj)
    localStorage.setItem('myMovies', JSON.stringify(savedMovies))

    console.log('searched', movieDetailArray)
    console.log('saved', savedMovies)
}

// Go to Watchlist
watchList.addEventListener("click", function() {
    location.href = "watchlist.html"
})