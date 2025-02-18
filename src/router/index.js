import { createRouter, createWebHistory } from "vue-router";

// Lazy-завантаження сторінок
const HomePage = () => import("../pages/HomePage/HomePage.vue");
const MoviesPage = () => import("../pages/MoviesPage/MoviesPage.vue");
const MovieDetailsPage = () =>
  import("../pages/MovieDetailsPage/MovieDetailsPage.vue");
const NotFoundPage = () => import("../pages/NotFoundPage/NotFoundPage.vue");
const MovieCast = () => import("../components/MoviesCast/MovieCast.vue");
const MovieReviews = () =>
  import("../components/MovieReviews/MovieReviews.vue");

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/movies", name: "movies", component: MoviesPage },
  {
    path: "/movies/:movieId",
    name: "movieDetails",
    component: MovieDetailsPage,
    props: true, // Передача параметрів як props
    children: [
      { path: "cast", name: "movieCast", component: MovieCast },
      { path: "reviews", name: "movieReviews", component: MovieReviews },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "notFound", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware для редіректів
router.beforeEach((to, from, next) => {
  if (to.meta?.redirect) {
    console.log("Redirecting to:", to.meta.redirect);
    next(to.meta.redirect);
  } else {
    next();
  }
});

export default router;
