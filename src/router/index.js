import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "GeneralLayout",
    component: () => import("@/common/layouts/GeneralLayout.vue"),
    children: [
      {
        path: "",
        name: "HomeView",
        component: () => import("@/views/UsersView.vue"),
      },

      {
        path: "/chat/:userId",
        name: "ChatLayout",
        component: () => import("@/common/layouts/ChatLayout.vue"),
        children: [
          {
            path: "view/:id",
            name: "ChatView",
            component: () => import("@/views/ChatView.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
