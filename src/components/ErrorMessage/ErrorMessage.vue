<template>
  <p class="text">Oops... try again later</p>
</template>

<script>
export default {
  name: "ErrorMessage",
};
</script>

<style scoped>
.text {
  color: var(--error-color);
  font-size: 16px;
  margin: 16px 0;
  padding: 8px;
  border: 1px solid var(--error-color);
  border-radius: 5px;
  background-color: rgba(176, 0, 32, 0.1);
  text-align: center;
}
</style>
