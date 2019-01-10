<template>
  <div class="container page_height p-5">
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-center">訂單內容</h3>
    <div class="row justify-content-center my-5">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th class="text-center">品名</th>
            <th class="text-center">數量</th>
            <th class="text-center">價錢</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="text-center">{{ item.product.title }}</td>
              <td class="text-center">{{ item.qty }}件</td>
              <td class="text-center">
                {{ item.final_total | currency }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-danger text-right pt-4 pr-0" colspan="2">總計</td>
              <td class="text-danger text-center pt-4">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="110">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-primary">確認並付款</button>
        </div>
        <div class="text-right" v-else>
          <router-link class="btn btn-secondary" to="/orderlist">查看其他訂單</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    order() {
      return this.$store.state.order;
    }
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch("getOrder", id);
    },
    payOrder() {
      this.$store.dispatch("payOrder", this.order.id);
    }
  },
  created() {
    this.getOrder(this.$route.params.orderId);
  }
}
</script>