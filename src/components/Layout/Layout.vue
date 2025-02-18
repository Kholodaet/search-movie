<template>
  <div class="container">
    <Navigation />
    <Suspense>
      <template #default>
        <slot />
      </template>
      <template #fallback>
        <div class="fallback">Please wait, the page is loading.</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Layout",
  components: {
    Navigation: defineAsyncComponent(() =>
      import("../Navigation/Navigation.vue")
    ),
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 16px;
}

.fallback {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: var(--text-color);
}
</style>
