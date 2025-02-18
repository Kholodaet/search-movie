<template>
  <div class="wrapper">
    <nav class="nav">
      <ul class="list">
        <li>
          <router-link to="/" :class="linkClass('/')">Home</router-link>
        </li>
        <li>
          <router-link to="/movies" :class="linkClass('/movies')"
            >Movies</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    linkClass(route) {
      return {
        link: true,
        active: this.$route.path === route,
      };
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #333;
  padding: 16px;
}
.nav {
  display: flex;
  justify-content: center;
}
.list {
  list-style: none;
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;
}
.link {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.link:hover {
  background-color: #555;
}
.active {
  background-color: #007bff;
}
</style>
