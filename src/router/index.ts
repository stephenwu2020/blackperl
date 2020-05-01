import Vue from "vue";
import Router from "vue-router";
import routes from "vue-auto-routing";
import { createRouterLayout } from "vue-router-layout";

Vue.use(Router);

const RouterLayout = createRouterLayout(layout =>
  import(`@/layouts/${layout}.vue`)
);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: RouterLayout,
      children: routes
    },
    {
      path: "*",
      component: RouterLayout,
      children: [
        {
          path: "",
          component: () => import("@/pages/error.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/dex") {
    next("/dex/GTM_ETH");
    return;
  }

  next();
});

export default router;
