"use strict";
const searchForm = document.querySelector('#search-form'), movies = document.querySelector('#movies'),
    posterUrl = 'https://image.tmdb.org/t/p/w500', searchBy = document.querySelector('.searchBy');
function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=4eda6ad7231230beb4c59e4ca893b654&language=ru&query='
            + searchText;
    if(searchText.trim().length === 0) {
        movies.innerHTML = '<h2 class="col-12 oops text-center">Search field should not be empty</h2>';
        return;
    }
    movies.innerHTML = "<div class='spinner'></div>";
    searchBy.innerHTML = `<h2 class="trends1">Search by request: ${searchText}</h2>`;
    fetch(server)
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            let inner = '', images = '', rating = '';
            if(output.results.length === 0){
                inner = '<h2 class="col-12 oops text-center">No results found for your request</h2>'
            }
            output.results.forEach(function (item) {
                let itemName = item.name || item.title, date = item.first_air_date || item.release_date,
                    rate = item.vote_average, overview = item.overview;
                rating = `${rate}<img src="./images/rate-star.png" alt="star" width="15px" height="15px">`;
                images = item.poster_path ? posterUrl + item.poster_path : './images/outOfService.jpg';
                if(item.media_type === 'movie' || item.media_type === 'tv' ) {
                    inner += `<div class="movies d-flex">
                                <div class="col-3">
                                <div class="posters" id="posters">
                                    <img src='${images}' id = 'imgInner' alt="${itemName}"
                                     width="284.5px" height="448px">
                                </div>
                          </div>
                          <div class="col-7">
                                <div class="names">
                                    <h2>${itemName}</h2>
                                </div>
                                <div class="overview">
                                    <p>${overview}</p>
                                </div>
                          </div>
                          <div class="col-2">
                                <div class="date">
                                    <h6>Release date: ${date}</h6>
                                </div>
                                  <div class="rating">
                                     <h6>Rating: ${rating}</h6>
                                 </div>
                          </div>\
                              </div>`;
                }
            });
            movies.innerHTML = inner;
        })
        .catch (function (reason) {
            movies.innerHTML = '<h2 class="oops text-center">Oops..Something wrong</h2>';
            console.log('error: ' + reason.status || reason);
        })
}
searchForm.addEventListener('submit', apiSearch);
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4eda6ad7231230beb4c59e4ca893b654')
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            let inner = '<div class="col-12 tr"><h2 class="text-center trends d-inline-block">' +
                'Trending</h2><img src="./images/fire.png" alt="fire" width="35px" height="35px"></div>',
                images = '', rating = '';
            movies.innerHTML = inner;
            if(output.results.length === 0){
                inner = `<h2 class="col-12 oops text-center">No results found for your request</h2>`
            }
            output.results.forEach(function (item) {
                let itemName = item.name || item.title, date = item.first_air_date || item.release_date,
                    rate = item.vote_average, overview = item.overview;
                rating = `${rate}<img src="./images/rate-star.png" alt="star" width="15px" height="15px">`;
                images = item.poster_path ? posterUrl + item.poster_path : './images/outOfService.jpg';
                    inner += `<div class="movies d-flex">
                                <div class="col-3">
                                <div class="posters" id="posters">
                                    <img src='${images}' id = 'imgInner' alt="${itemName}"
                                     width="284.5px" height="448px">
                                </div>
                          </div>
                          <div class="col-7">
                                <div class="names">
                                    <h2>${itemName}</h2>
                                </div>
                                <div class="overview">
                                    <p>${overview}</p>
                                </div>
                                <div class="youtube">
                                
                                </div>
                          </div>
                          <div class="col-2">
                                <div class="date">
                                    <h6>Release date: ${date}</h6>
                                </div>
                                <div class="rating">
                                     <h6>Rating: ${rating}</h6>
                                 </div>
                          </div>\
                              </div>`;
            });
            movies.innerHTML = inner;
        })
});
