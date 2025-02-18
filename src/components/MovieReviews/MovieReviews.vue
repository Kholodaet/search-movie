<template>
  <div>
    <Loader v-if="isLoading" />
    <div v-if="error">
      <ErrorMessage />
    </div>

    <div v-else>
      <ul v-if="movieReviews && movieReviews.length > 0" class="list">
        <li v-for="review in movieReviews" :key="review.id" class="item">
          <p class="username">{{ review.author_details.username }}:</p>
          <p>{{ review.content }}</p>
          <hr class="hr" />
        </li>
      </ul>
      <p v-else class="notFound">Sorry, we can not find any reviews.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getReviewsMovies } from "../../services/apiMovies";
import Loader from "../Loader/Loader.vue";
import ErrorMessage from "../ErrorMessage/ErrorMessage.vue";

export default {
  components: {
    Loader,
    ErrorMessage,
  },
  setup() {
    const route = useRoute();
    const movieId = route.params.movieId;
    const movieReviews = ref([]);
    const isLoading = ref(false);
    const error = ref(false);

    onMounted(async () => {
      try {
        isLoading.value = true;
        const data = await getReviewsMovies(movieId);
        movieReviews.value = data;
      } catch (err) {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    });

    return {
      movieReviews,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.username {
  font-weight: bold;
  color: var(--text-color);
}

.hr {
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 16px 0;
}

.notFound {
  text-align: center;
  color: var(--text-color);
  margin-top: 32px;
  font-size: 18px;
}
</style>
