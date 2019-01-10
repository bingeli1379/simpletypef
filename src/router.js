import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "",
      component: Dashboard,
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/shopping/all",
          name: "Shopping_all",
          component: () => import("./views/Shopping_all.vue")
        },
        {
          path: "/shopping/coat",
          name: "Shopping_coat",
          component: () => import("./views/Shopping_coat.vue")
        },
        {
          path: "/shopping/clothes",
          name: "Shopping_clothes",
          component: () => import("./views/Shopping_clothes.vue")
        },
        {
          path: "/shopping/pants",
          name: "Shopping_pants",
          component: () => import("./views/Shopping_pants.vue")
        },
        {
          path: "/shopping/bag",
          name: "Shopping_bag",
          component: () => import("./views/Shopping_bag.vue")
        },
        {
          path: "/shopping/accessory",
          name: "Shopping_accessory",
          component: () => import("./views/Shopping_accessory.vue")
        },
        {
          path: "/shopping/product/:id",
          name: "Product",
          component: () => import("./views/Product.vue")
        },
        {
          path: "/checkout/:orderId",
          name: "Checkout",
          component: () => import("./views/Checkout.vue")
        },
        {
          path: "/carts",
          name: "Carts",
          component: () => import("./views/Carts.vue")
        },
        {
          path: "/order",
          name: "Order",
          component: () => import("./views/Order.vue")
        },
        {
          path: "/orderlist",
          name: "Orderlist",
          component: () => import("./views/Orderlist.vue")
        },
        {
          path: "/intro",
          name: "Intro",
          component: () => import("./views/Intro.vue")
        },
        {
          path: "/intro/carhartt",
          name: "Carhartt",
          component: () => import("./views/Intro_carhartt.vue")
        },
        {
          path: "/intro/guess",
          name: "Guess",
          component: () => import("./views/Intro_guess.vue")
        },
        {
          path: "/intro/sportb",
          name: "Sportb",
          component: () => import("./views/Intro_sportb.vue")
        },
        {
          path: "/intro/zara",
          name: "Zara",
          component: () => import("./views/Intro_zara.vue")
        },
        {
          path: "/intro/levis",
          name: "Levis",
          component: () => import("./views/Intro_levis.vue")
        },
        {
          path: "/intro/gucci",
          name: "gucci",
          component: () => import("./views/Intro_gucci.vue")
        },
        {
          path: "/admin/edit/all",
          name: "Edit_all",
          component: () => import("./views/Edit_all.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/edit/coat",
          name: "Edit_coat",
          component: () => import("./views/Edit_coat.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/edit/clothes",
          name: "Edit_clothes",
          component: () => import("./views/Edit_clothes.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/edit/pants",
          name: "Edit_pants",
          component: () => import("./views/Edit_pants.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/edit/bag",
          name: "Edit_bag",
          component: () => import("./views/Edit_bag.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/edit/accessory",
          name: "Edit_accessory",
          component: () => import("./views/Edit_accessory.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/coupon",
          name: "Coupon",
          component: () => import("./views/Coupon.vue"),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "/signin",
      name: "Signin",
      component: () => import("./views/Signin.vue")
    }
  ]
});
