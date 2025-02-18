<template>
  <div class="container">
    <h1 class="title">Search Movies</h1>
    <form @submit.prevent="handleSubmit" class="search-form">
      <input
        v-model="query"
        type="text"
        placeholder="Search for movies"
        class="search-input"
      />
      <button type="submit" class="search-button">Search</button>
    </form>

    <Loader v-if="isLoading" />
    <ErrorMessage v-if="error" />

    <MovieList v-if="!isLoading && !error" :movies="movies" />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSearchMovies } from "../../services/apiMovies";
import Loader from "../../components/Loader/Loader.vue";
import MovieList from "../../components/MovieList/MovieList.vue";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    Loader,
    MovieList,
    ErrorMessage,
  },
  setup() {
    const query = ref("");
    const movies = ref([]);
    const isLoading = ref(false);
    const error = ref(false);
    const page = ref(1);
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    const fetchMovies = async () => {
      if (!query.value.trim()) return;
      try {
        error.value = false;
        isLoading.value = true;
        const data = await getSearchMovies(query.value, page.value);
        movies.value = data;
      } catch (err) {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const handleSubmit = () => {
      if (!query.value.trim()) {
        toast.error("Enter something to search");
        return;
      }
      page.value = 1;
      router.push({ query: { query: query.value } });
    };

    watch(
      () => route.query.query,
      (newQuery) => {
        query.value = newQuery || "";
        if (newQuery) fetchMovies();
      },
      { immediate: true }
    );

    return {
      query,
      movies,
      isLoading,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  width: 70%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
}

.search-button {
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-button:hover {
  background: #0056b3;
}

@media (max-width: 600px) {
  .search-form {
    flex-direction: column;
    align-items: center;
  }

  .search-input {
    width: 100%;
  }

  .search-button {
    width: 100%;
  }
}
</style>
