<template>
  <ul class="list">
    <li v-for="movie in movies" :key="movie.id" class="item">
      <router-link
        :to="{
          name: 'movieDetails',
          params: { movieId: movie.id },
        }"
      >
        <img
          :src="getImageSrc(movie.poster_path)"
          @error="handleError"
          :alt="movie.title"
        />
        <div class="name">
          <p class="title">{{ movie.title }}</p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import defaultPicture from "../../img/picture.jpg";

export default {
  name: "MovieList",
  props: {
    movies: Array,
  },
  methods: {
    getImageSrc(posterPath) {
      return posterPath
        ? `https://image.tmdb.org/t/p/w200/${posterPath}`
        : defaultPicture;
    },
    handleError(e) {
      e.target.src = defaultPicture;
      e.target.onerror = null; // Уникаємо циклу помилок
    },
  },
};
</script>
<style scoped>
/* Загальний стиль для сітки */
.list {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Автоматичне заповнення сітки */
  gap: 16px;
  padding: 0;
  list-style: none;
  justify-content: center; /* Центруємо сітку */
  width: 100%; /* Встановлення ширини на 100% */
  max-width: 1200px; /* Максимальна ширина контейнера */
  margin: 0 auto; /* Центрування контейнера */
}

/* Стиль для кожного елемента списку */
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Встановлення висоти на 100% */
  box-sizing: border-box;
  overflow: hidden;
}

/* Ефект при наведенні */
.item:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Стиль для картинки */
img {
  width: 100%;
  height: 300px; /* Встановлено фіксовану висоту */
  object-fit: cover; /* Збереження співвідношення сторін */
  border-radius: 8px;
}

/* Стиль для блоку з назвою */
.name {
  margin-top: 10px;
}

/* Стиль для заголовка */
.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>
