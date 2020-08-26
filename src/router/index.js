import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/empresas",
    name: "Empresas",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Empresas.vue"),
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () => import("../views/Usuarios.vue"),
  },
  {
    path: "/relatorios",
    name: "Relatorios",
    component: () => import("../views/Relatorios.vue"),
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: () => import("../views/Clientes.vue"),
  },
  {
    path: "/transacoes",
    name: "Transacoes",
    component: () => import("../views/Transacoes.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
