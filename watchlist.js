// DOM objects manipulated 
const myWatchlist = document.getElementById("my-watchlist")
const searchView = document.getElementById("search-view")
let moviesFromLocalStorage = []
moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovies"))

console.log(moviesFromLocalStorage)

// Function for rendering HTML to the DOM 
async function getFromStorage(moviesArray) {
    let movieHtml = ''
        for (let movie of moviesArray) {
            movieHtml += `
            <img src="${movie.Poster}" id="movie-img" class="movie-img" alt="no-img-available">
            <div class="movie-items" id="movie-items">
                <div id="title" class="title">${movie.Title}</div>
                <span id="runtime" class="runtime">${movie.Runtime}</span>
                <span id="genre" class="genre">${movie.Genre}</span>
                <div class="rating"><i class="fa-sharp fa-solid fa-star"></i>${movie.Ratings[0].Value}</div>
                <div id="plot" class="plot">${movie.Plot}</div>
                <button type="button" id="${movie.imdbID}" class="remove" data-remove="${movie.imdbID}"><i class="bx bx-minus-circle"></i>Watchlist</button>
            </div> `

            if (movie.Poster == "N/A") {
                `<img src="images/no-img-avail.jpeg" id="movie-img" class="movie-img"></img>`
            }
       }
        myWatchlist.innerHTML = movieHtml
        myWatchlist.style.background = "white"
       
    
    if (!moviesFromLocalStorage.length) { {
        myWatchlist.innerHTML = `
        <div class="empty">
            <h2>Your watchlist is empty.</h2>
            <h5>Go to Search View to add some movies.</h5>
        </div>`
    }
    }

}

// Calling getFromStorage with data in local storage 
getFromStorage(moviesFromLocalStorage)

// Removing a movie from watchlist
document.addEventListener("click", function(e) {
    e.preventDefault()
    if (e.target.dataset.remove) {
        removeFromWatchlist(e.target.dataset.remove)
    }
})

// Removing a movie from local storage 
function removeFromWatchlist(movieId) {
    const removeMovie = moviesFromLocalStorage.find(movie => movie.imdbId = movieId)
    moviesFromLocalStorage.splice(removeMovie, 1)
    localStorage.setItem("myMovies", JSON.stringify(moviesFromLocalStorage))
    getFromStorage(moviesFromLocalStorage)
}

// Go back to search view 
searchView.addEventListener("click", function() {
    location.href = "index.html"
})






