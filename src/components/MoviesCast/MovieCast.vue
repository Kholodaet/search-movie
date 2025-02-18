<template>
  <div v-if="cast">
    <ul class="cast-list">
      <li v-for="actor in cast" :key="actor.id" class="actor-card">
        <div class="image-wrapper">
          <img
            :src="
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : defaultImage
            "
            :alt="actor.name"
            class="actor-image"
          />
        </div>
        <p class="actor-name">{{ actor.name }}</p>
      </li>
    </ul>
  </div>
  <div v-else>Loading cast...</div>
  <div v-if="error">Error loading cast.</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCastByMovieId } from "../../services/apiMovies";
import defaultImage from "../../img/picture.jpg"; // Шлях до зображення за замовчуванням

export default {
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const cast = ref(null);
    const error = ref(null);

    onMounted(async () => {
      try {
        cast.value = await getCastByMovieId(props.movieId);
      } catch (err) {
        console.error("Error fetching cast:", err);
        error.value = err;
      }
    });

    return { cast, error, defaultImage };
  },
};
</script>

<style scoped>
.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
  padding: 0;
}
.actor-card {
  width: calc(25% - 16px);
  text-align: center;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex; /* Додано для розміщення зображення та підпису */
  flex-direction: column; /* Додано для вертикального розміщення */
  align-items: center; /* Додано для центрування */
}
.image-wrapper {
  /* Додано обгортку для зображення */
  width: 100px; /* Задайте бажану ширину */
  height: 150px; /* Задайте бажану висоту */
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 8px;
}
.actor-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Зберігаємо пропорції та заповнюємо контейнер */
}
.actor-name {
  font-weight: bold;
}
</style>
