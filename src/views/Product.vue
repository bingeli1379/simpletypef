<template>
  <div class="container page_height py-5">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div class="col-md-10 my-4">
        <div class="row">
          <div class="col-md-6">
            <img class="img-fluid" :src="product.imageUrl" alt="Product image">
          </div>
          <div class="col-md-6 d-flex flex-column align-items-start">
            <h4 class="mb-4">{{ product.title }}</h4>
            <div>
              <p class="badge badge-secondary mb-4 mx-1">{{ product.brand }}</p>
              <p class="badge badge-secondary mb-4 mx-1">{{ product.sex }}</p>
            </div>
            <div class="mb-4">{{ product.content }}</div>
            <span class="my-1" v-if="product.size == undefind">尺寸: {{ product.size }}號</span>
            <span class="text-danger">※尺寸請參考下方對照表</span>
            <del class="h6 d-block mb-2 mt-auto">NT{{ product.origin_price | currency }}</del>
            <div class="h5 text-danger mb-2">NT{{ product.price | currency }}</div>
            <div>
              <select class="btn btn-secondary mr-3" v-model="qty">
                <option :value="item" v-for="item in 10">購買 {{ item }} 件</option>
              </select>
              <button type="button" class="btn btn-secondary" @click="addtoCart(product.id, qty)">加入購物車</button>
            </div>
          </div>
        </div>
        <hr class="mt-5">
        <div class="text-center">
          <img class="img-fluid" src="../assets/img/men.jpg" alt="men size" v-if="product.sex == 'MEN'">
          <img class="img-fluid" src="../assets/img/women.jpg" alt="women size" v-if="product.sex == 'WOMEN'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Sidebar from "../components/Sidebar";

export default {
  name: "Shopping",
  data() {
    return {
      qty: "1"
    }
  },
  components: {
    Sidebar
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    product() {
      return this.$store.state.product;
    }
  },
  methods: {
    getProduct(id) {
      this.$store.dispatch("getProduct", id);
    },
    addtoCart(id, qty) {
      const cart = {
        product_id: id,
        qty
      };
      this.$store.dispatch("addtoCart", cart);
    },
    getCart() {
      this.$store.dispatch("getCart");
    }
  },
  created() {
    this.getProduct(this.$route.params.id);
  }
};
</script>
