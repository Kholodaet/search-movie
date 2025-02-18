<template>
  <div class="loader">
    <b>Loading....</b>
    <vue-loading-overlay
      :active="true"
      :is-full-page="true"
      color="#4fa94d"
    ></vue-loading-overlay>
  </div>
</template>

<script>
import VueLoadingOverlay from "vue-loading-overlay";

export default {
  components: {
    VueLoadingOverlay,
  },
};
</script>

<style scoped>
.loader {
  display: grid;
  place-items: center;
  margin-top: 20px;
}
</style>
