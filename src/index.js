let apiEndpoint = 'https://api.npoint.io/f8d1be198a18712d3f29/films/'
const filmList = document.getElementById('films')
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('film item')[0].remove()
    getMovies(apiEndpoint)
})

function getMovies(apiEndpoint) {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                showMovie(movie)
            });
        })
}

function showMovie(movie) {
    const listItem = document.createElement('li')
    listItem.style.cursor = "pointer"
    listItem.textContent = (movie.title).toUpperCase()
    filmList.appendChild(listItem)
    addClickListener()
}

function addClickListener() {
    let listItems = filmList.children

    for (let i = 0; i < listItems.length; i++) {
        let listItem = listItems[i]

        listItem.addEventListener('click', () => {
            fetch(`${apiEndpoint}/${i + 0}`)

                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                    displayMovieDetails(movie)
                })

        })
    }
}

function displayMovieDetails(movieDetails) {
    const posterPreview = document.getElementById('poster')
    posterPreview.src = movieDetails.poster;

    const titleElement = document.querySelector('#title');
    titleElement.textContent = movieDetails.title;

    const runtimeElement = document.querySelector('#runtime');
    runtimeElement.textContent = `${movieDetails.runtime} minutes`;

    const descriptionElement = document.querySelector('#film-info');
    descriptionElement.textContent = movieDetails.description;

    const showtimeElement = document.querySelector('#showtime')
    showtimeElement.textContent = movieDetails.showtime;

    const availableTicketsElement = document.querySelector('#ticket-num')
    availableTicketsElement.textContent = movieDetails.capacity - movieDetails.tickets_sold;
}

const ticketButton = document.getElementById('buy-ticket')

ticketButton.addEventListener('click', function (e) {
    let remainingTickets = document.querySelector('#ticket-num').textContent
    e.preventDefault()

    if (remainingTickets > 0) {
        document.querySelector('#ticket-num').textContent = remainingTickets - 1
    }

    else if (parseInt(remainingTickets, 10) === 0) {
        ticketButton.textContent = 'Sold Out'
    }
})
