<template>
  <div class="containerPage">
    <div>
      <router-link to="/" class="backButton">⬅ Go Back</router-link>
    </div>

    <div v-if="movieDetails">
      <div class="wrapper">
        <div>
          <img
            :src="
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                : picture
            "
            :alt="movieDetails.title"
          />
        </div>
        <div>
          <p class="title">{{ movieDetails.title }}</p>
          <p class="genres">
            Genres:
            <span v-for="genre in movieDetails.genres" :key="genre.id">
              {{ genre.name }}.
            </span>
          </p>
          <p class="overview">Overview:</p>
          <p class="overviewText">{{ movieDetails.overview }}</p>
          <p class="rating">Rating: {{ movieDetails.vote_average }}</p>
        </div>
      </div>
    </div>

    <Loader v-if="isLoading" />
    <ErrorMessage v-if="error" />

    <ul class="listInfo">
      <li>
        <router-link :to="`/movies/${movieId}/cast`" class="link">
          Cast
        </router-link>
      </li>
      <li>
        <router-link :to="`/movies/${movieId}/reviews`" class="link">
          Reviews
        </router-link>
      </li>
    </ul>

    <router-view :key="$route.fullPath" :movie-id="movieId" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getDetailsMovies } from "../../services/apiMovies";
import Loader from "../../components/Loader/Loader.vue";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.vue";
import picture from "../../img/picture.jpg";

export default {
  components: {
    Loader,
    ErrorMessage,
  },
  setup() {
    const route = useRoute();
    const movieId = computed(() => route.params.movieId);
    const movieDetails = ref(null);
    const isLoading = ref(false);
    const error = ref(false);
    const savedURL = ref(route?.state?.from || "/movies");

    const fetchMoviesById = async (id) => {
      try {
        error.value = false;
        isLoading.value = true;
        const data = await getDetailsMovies(id);
        movieDetails.value = data;
      } catch (err) {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchMoviesById(movieId.value);
    });

    watch(
      () => movieId.value,
      (newId, oldId) => {
        if (newId !== oldId) {
          fetchMoviesById(newId);
        }
      }
    );

    return {
      movieDetails,
      isLoading,
      error,
      movieId,
      savedURL,
    };
  },
};
</script>

<style scoped>
.containerPage {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.backButton {
  display: inline-block;
  margin-bottom: 20px;
  color: #ffffff;
  background-color: #007bff;
  padding: 10px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.backButton:hover {
  background-color: #0056b3;
}

.wrapper {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  align-items: center;
}

.wrapper img {
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
}

.genres,
.overview,
.rating {
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #444;
}

.overviewText {
  margin-bottom: 32px;
  line-height: 1.5;
  color: #555;
}

.listInfo {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
}

.link {
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
  font-weight: 600;
}

.link:hover {
  color: #0056b3;
}

/* Анімація переходів */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
