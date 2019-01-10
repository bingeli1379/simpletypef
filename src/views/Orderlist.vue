<template>
  <div class="container page_height py-5">
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-center">訂單列表</h3>
    <table class="table my-5">
      <thead>
        <th class="text-center">收件人</th>
        <th class="text-center">Email</th>
        <th class="text-center">商品</th>
        <th class="text-center" width="100">應付金額</th>
        <th class="text-center" width="100">是否付款</th>
        <th class="text-center" width="100">前往確認</th>
      </thead>
      <tbody class="border-bottom">
        <tr v-for="item in orders">
          <td class="align-middle text-center">
            {{ item.user.name }}
          </td>
          <td class="align-middle text-center">
          {{ item.user.email }}</td>
          <td class="align-middle text-center">
            <div v-for="product in item.products">{{ product.product.title }} / {{ product.qty }}件</div>
          </td>
          <td class="align-middle text-center">
          {{ item.total | currency }}</td>
          <td class="align-middle text-center">
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td class="align-middle text-center">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="gotoOrder(item.id)">
              <i class="fas fa-angle-double-right"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-danger text-center h5 mb-5">※請於下單後 24 小時內完成付款，商品於付款完成後寄送</div>
    <nav aria-label="Page navigation example" v-if="pagination !== ''">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click="getOrders(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{'active': pagination.current_page === page}"><a class="page-link" href="#" @click="getOrders(page)">{{ page }}</a></li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click="getOrders(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Carts",
    computed: {
      orders() {
        return this.$store.state.orders;
      },
      isLoading() {
        return this.$store.state.isLoading;
      },
      pagination() {
        return this.$store.state.pagination;
      }
    },
    methods: {
      getOrders(page = 1) {
        this.$store.dispatch("getOrders", page);
      },
      gotoOrder(id) {
        this.$router.push(`/checkout/${id}`);
      }
    },
    created() {
      this.getOrders();
    }
  }
</script>
