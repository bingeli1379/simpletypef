<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link class="navbar-brand" to="/">Simpletype</router-link>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/intro">品牌介紹</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/all">購物商城</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orderlist">訂單列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-primary" to="/admin/edit/all"
          v-if="signin === true">編輯產品</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-primary" to="/admin/coupon"
          v-if="signin === true">優惠券</router-link>
        </li>
      </ul>
      <router-link class="text-white nav-link text-right" to="/signin"
      v-if="signin === false">Sign in</router-link>
      <a class="text-white nav-link text-right" href="#" @click="signout"
      v-if="signin === true">Sign out</a>
    </div>
    <router-link class="text-white mr-0 px-3 ml-auto" to="/carts">
      <i class="fa fa-shopping-cart"></i>
      <span class="mx-2" v-if="carts.carts.length > 0">{{ carts.carts.length }}</span>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    signin() {
      return this.$store.state.signin;
    },
    carts() {
      return this.$store.state.carts;
    }
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      vm.$http.post(api).then(res => {
        if (res.data.success) {
          vm.$store.commit("SIGNIN", false);
          vm.$router.push("/");
        }
      });
    },
    getCart() {
      this.$store.dispatch("getCart");
    }
  },
  created() {
    this.getCart();
  }
};
</script>
