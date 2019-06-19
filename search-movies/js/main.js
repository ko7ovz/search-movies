"use strict";
const searchForm = document.querySelector('#search-form'), movies = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=4eda6ad7231230beb4c59e4ca893b654&language=ru&query='
        + searchText;
    requestApi(server);
}
searchForm.addEventListener('submit', apiSearch);
function requestApi(url){
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;
        if(request.status !== 200) return console.log('error' + request.status);
        const output = JSON.parse(request.responseText);
        let inner = '', images = '', date = '', rating = '', overview = '';
        output.results.forEach(function (item) {
            let nameItem = item.name || item.title, imgs = item.poster_path,
                dates = item.first_air_date || item.release_date, rate = item.vote_average, over = item.overview;
            overview = over;
            rating = `Rating: ${rate}`;
            date = dates;
            images += `<img src='https://image.tmdb.org/t/p/w500${imgs}'`;
            inner += `<div class="col-3">
                            <div class="posters" id="posters">
                                <img src='https://image.tmdb.org/t/p/w500${imgs}' id = 'imgInner' alt="img"
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
    });
}
