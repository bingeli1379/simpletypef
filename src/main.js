import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap";
import VeeValidate from "vee-validate";
import zhTWValidate from "vee-validate/dist/locale/zh_TW";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import currencyFilter from "./assets/filters/currency";

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VeeValidate, { events: "input|blur" });
VeeValidate.Validator.localize("zh_TW", zhTWValidate);

Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api).then(res => {
      if (res.data.success) {
        next();
      } else {
        next({
          path: "/signin"
        });
      }
    });
  } else {
    next();
  }
});
