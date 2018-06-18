import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import spinal from "./SpinalSystem/spinal";
import VueRouter from "vue-router";
import MainContent from "./MainContent/MainContent.vue";
import AdminContent from "./AdminContent/AdminContent.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/page/:id",
      component: MainContent
    },
    {
      path: "/admin",
      component: AdminContent
    },
    {
      path: "/admin/:id",
      component: AdminContent
    },

    {
      path: "*",
      redirect: "/page/404"
    }
  ]
});

Vue.use(spinal);

import "./app.css";

Vue.use(VueMaterial);
window.spinalApp = new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
