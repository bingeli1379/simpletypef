<template>
  <div class="container page_height py-5">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-6 mb-4" v-for="item in CategoryProducts[currentPage]" :key="item.id">
            <div class="card border-0 shadow-sm">
              <router-link class="card-body badge-light" :to="{
                name: 'Product',
                params: { id: item.id}
                }" @click="getProduct()">
                <div style="height: 300px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                <h5 class="card-title">
                  <p class="h4 text-dark">{{ item.title }}</p>
                  <p class="h4 text-dark">{{ item.brand }}</p>
                </h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h6 mr-2 ml-auto" v-if="item.price === item.origin_price">NT{{ item.origin_price | currency }}</div>
                  <del class="h6 mr-2 ml-auto" v-if="item.price !== item.origin_price">NT{{ item.origin_price | currency }}</del>
                  <div class="h5 text-danger" v-if="item.price !== item.origin_price">NT{{ item.price | currency }}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination d-flex justify-content-center">
            <li class="page-item" :class="{'disabled': currentPage === 0}">
              <a class="page-link" href="#" aria-label="Previous" @click="currentPage -= 1">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="page in CategoryProducts.length" :key="page":class="{'active': currentPage === page - 1}">
              <a class="page-link" href="#" @click="currentPage = page - 1">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': currentPage == CategoryProducts.length -1}">
              <a class="page-link" href="#" aria-label="Next" @click="currentPage += 1">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "../components/Sidebar";

export default {
  name: "Shopping",
  components: {
    Sidebar
  },
  data() {
    return {
      tempProduct: {},
      isNew: false,
      currentPage: 0,
      status: {
        fileUploading: false
      }
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    ...mapGetters(["CategoryProducts"])
  },
  methods: {
    category() {
      const category = "coat";
      this.$store.commit("CATEGORY", category);
    },
    getProducts() {
      this.$store.dispatch("getShoppingProducts");
    }
  },
  created() {
    this.getProducts();
    this.category();
  }
};
</script>
