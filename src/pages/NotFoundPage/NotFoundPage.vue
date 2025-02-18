<template>
  <div class="container">
    <p>Sorry, this page does not exist.</p>
    <p>
      <router-link to="/" class="link"> Go Back! </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
}

.link {
  color: #007bff;
}

.link:hover {
  color: #0155ad;
}
</style>
