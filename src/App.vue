<script setup>
import { RouterView } from "vue-router";
import Layout from "./components/Layout/Layout.vue";
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<style>
#app {
  width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
ul,
ol {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
