"use strict";
const searchForm = document.querySelector('#search-form'), movies = document.querySelector('#movies'),
      posterUrl = 'https://image.tmdb.org/t/p/w500';
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
                console.log(item.media_type);
                let itemName = item.name || item.title, date = item.first_air_date || item.release_date,
                    rate = item.vote_average, overview = item.overview;
                rating = `Rating: ${rate}`;
                images = item.poster_path ? posterUrl + item.poster_path : './images/outOfService.jpg';
                console.log(output.results);
                if(item.media_type === 'movie' || item.media_type === 'tv' ) {
                    inner += `<div class="col-3">
                                <div class="posters" id="posters">
                                    <img src='${images}' id = 'imgInner' alt="${itemName}"
                                     width="250px" height="338px">
                                </div>
                          </div>
                          <div class="col-7">
                                <div class="names d-inline-flex">
                                    <h2>${itemName}</h2>
                                </div>
                                <div class="overview">
                                    <p>${overview}</p>
                                </div>
                                <div class="rating d-inline-flex">
                                     <h6>${rating}/10</h6>
                                 </div>
                          </div>
                          <div class="col-2">
                                <div class="date">
                                    <h6>${date}</h6>
                                </div>
                          </div>`;
                }
            });
            movies.innerHTML = inner;
        })
        .catch (function (reason) {
            movies.innerHTML = 'Oops..Something wrong';
            console.log('error: ' + reason.status);
        })
}
searchForm.addEventListener('submit', apiSearch);

