
//Налаштування
const url = 'https://api.themoviedb.org/3/movie/';
const api_key = 'd67a2a3b62c9be642cb3e4f753cbda85';

const filmsWrapper = document.querySelector('.films');
const loader = document.querySelector('.loader-wrapper');

async function fetchData(url){
    const response = await fetch(url) 
    const data = await response.json();
    return data
}


//Отримання і вивід фільмів
async function fetchAndRenderFilms(){
    // Show preloader
    loader.classList.remove('none');

    //Fetch films data
    const data = await fetchData(url + "popular?" + 'api_key=' + api_key + '&language=en-US&page=1');

    //Hide preloader
    loader.classList.add('none');

    //Render films on page
    renderFilms(data.results);
    slider();

}
fetchAndRenderFilms().catch((err) => console.log(err));

function renderFilms(films){
    for(film of films){
        const card = document.createElement('div');
        card.classList.add("card", "swiper-slide");
        card.id = film.id;

        card.onclick = openFilmDetails;

        const img = film.poster_path;

        const html = `
                    <img src="https://image.tmdb.org/t/p/original${img}" alt="">
                      `;
                card.insertAdjacentHTML('afterbegin',html)

        filmsWrapper.insertAdjacentElement('beforeend',card);
        }
}

async function openFilmDetails(e){
    // Get id Film
    const id = e.currentTarget.id;

    // Get data about film
    const data = await fetchData(url + id + "?" + 'api_key=' + api_key + '&language=en-US')
    console.log(data);

    //show film detail
    renderFilmData(data)
}
function renderFilmData(film){
    console.log('render');


    //Backround img
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.backgroundImage = `url(https://www.themoviedb.org/t/p/original/${film.backdrop_path})`;

    //1. Render movies_container
    const nav = document.querySelector('.nav');
    const containerMovie = document.createElement('div')
    containerMovie.classList.add('movies_container');
    nav.insertAdjacentElement("afterend", containerMovie)
    // Container
    //2. Detail Movie
    const html = `<h1 class="name_movie">${film.title}</h1>
    <h3 class="title_movie">${film.tagline}</h3>
    <p class="desc">${film.overview}</p>
    <p class="rate">Rate IMdb: ${film.vote_average}</p>
    <div class="buttons_film">
        <button class="watch">Watch now</button>
        <button class="trailer">Trailer</button>
    </div>`
    //
    containerMovie.insertAdjacentHTML('beforeend',html)
}



//Slider
function slider(){
    var swiper = new Swiper(".swiper", {
        slidesPerView: 9,
        spaceBetween: 8,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
      });
}



const cards = document.querySelectorAll('.card');
cards.forEach(item =>{ 
    item.addEventListener('click', (e) =>{
    cards.forEach(el=>{ el.classList.remove('active_card'); });
    item.classList.add('active_card')
})
})
