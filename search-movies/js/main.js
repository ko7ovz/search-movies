"use strict";
const searchForm = document.querySelector('#search-form'), movies = document.querySelector('#movies');
function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value,
          server = 'https://api.themoviedb.org/3/search/multi?api_key=4eda6ad7231230beb4c59e4ca893b654&language=ru&query='
            + searchText,
          url = 'https://image.tmdb.org/t/p/w500';
    movies.innerHTML = 'Loading..';
    fetch(server)
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            let inner = '', images = '', rating = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title, imgs = item.poster_path,
                    date = item.first_air_date || item.release_date, rate = item.vote_average, overview = item.overview;
                rating = `Rating: ${rate}`;
                images = url + imgs ;
                console.log(output.results);
                if (item.poster_path === null) {
                    images = 'https://i.ibb.co/W36TD0c/glo.jpg';
                }
                inner += `<div class="col-3">
                            <div class="posters" id="posters">
                                <img src='${images}' id = 'imgInner' alt="${nameItem}"
                                 width="250px" height="338px">
                            </div>
                      </div>
                      <div class="col-7">
                            <div class="names d-inline-flex">
                                <h2>${nameItem}</h2>
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
            });
            movies.innerHTML = inner;
        })
        .catch (function (reason) {
            movies.innerHTML = 'Oops..Something wrong';
            console.log('error: ' + reason.status);
        })
}
searchForm.addEventListener('submit', apiSearch);

