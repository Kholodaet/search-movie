<template>
  <div class="container">
    <MovieList :movies="movies" v-if="movies.length > 0" />
    <Loader v-if="isLoading" />
    <ErrorMessage v-if="error" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getTrendingMovies } from "../../services/apiMovies";
import MovieList from "../../components/MovieList/MovieList.vue";
import Loader from "../../components/Loader/Loader.vue";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.vue";

export default {
  components: {
    MovieList,
    Loader,
    ErrorMessage,
  },
  setup() {
    const movies = ref([]);
    const isLoading = ref(false);
    const error = ref(false);

    const fetchMovies = async () => {
      try {
        error.value = false;
        isLoading.value = true;
        const data = await getTrendingMovies();
        movies.value = data || [];
      } catch (err) {
        error.value = true;
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchMovies);

    return {
      movies,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 16px;
  margin: 0 auto;
}

/* Стиль для сітки фільмів */
.movie-list {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* змінено на auto-fill для кращої адаптивності */
  gap: 16px;
  justify-items: center; /* Центрування елементів */
  padding: 16px 0;
}

/* Стиль для кожного елементу сітки */
.movie-item {
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  width: 100%; /* додаємо ширину 100% */
  display: flex;
  flex-direction: column;
}

.movie-item:hover {
  transform: scale(1.05);
}

.movie-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.movie-title {
  padding: 10px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  background: #333;
  border-radius: 0 0 8px 8px;
}
</style>
