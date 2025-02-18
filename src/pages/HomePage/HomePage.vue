<template>
  <div class="container">
    <MovieList :movies="movies" v-if="movies.length > 0" />
    <Loader v-if="isLoading" />
    <ErrorMessage v-if="error" />
    <button v-if="!isLoading && !error" @click="loadMore" class="load-more">
      Load More
    </button>
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
    const page = ref(1);

    const fetchMovies = async () => {
      try {
        error.value = false;
        isLoading.value = true;
        const data = await getTrendingMovies(page.value);
        movies.value = [...movies.value, ...data];
      } catch (err) {
        error.value = true;
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    const loadMore = () => {
      page.value++;
      fetchMovies();
    };

    onMounted(() => fetchMovies());

    return {
      movies,
      isLoading,
      error,
      loadMore,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 16px;
  margin: 0 auto;
  text-align: center;
}

.load-more {
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.load-more:hover {
  background-color: #605f5f;
}
</style>
