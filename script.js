const API_KEY = "261e8a695bc01d8ea73fec22eaf5e64b";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w300";

const poster = document.getElementById("poster");
const titleEl = document.getElementById("title");
const ratingEl = document.getElementById("rating");
const overviewEl = document.getElementById("overview");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let movies = [];
let currentIndex = 0;
const DISPLAY_COUNT = 4;  // quantidade de filmes para pegar

// Busca filmes populares ao carregar
window.addEventListener("DOMContentLoaded", () => {
  fetchPopularMovies();
});

async function fetchPopularMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    );
    const data = await res.json();
    movies = data.results.slice(0, DISPLAY_COUNT); // pega só 4 filmes
    showMovie(currentIndex);
    startAutoSlide(); // inicia troca automática
  } catch (err) {
    console.error(err);
    titleEl.textContent = "Erro ao carregar filmes";
  }
}

// Mostra o filme atual
function showMovie(index) {
  const movie = movies[index];
  if (!movie) return;

  poster.src = movie.poster_path ? IMG_URL + movie.poster_path : "";
  poster.alt = movie.title;
  titleEl.textContent = movie.title;
  ratingEl.textContent = `Nota: ${movie.vote_average} ⭐`;
  overviewEl.textContent = movie.overview || "Sem sinopse disponível.";
}

// Navegação manual
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + movies.length) % movies.length;
  showMovie(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % movies.length;
  showMovie(currentIndex);
});

// Troca automática a cada 5 segundos
function startAutoSlide() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % movies.length;
    showMovie(currentIndex);
  }, 5000); // 5000ms = 5 segundos
}
