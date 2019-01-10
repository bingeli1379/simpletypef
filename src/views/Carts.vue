<template>
  <div class="container page_height py-5">
    <loading :active.sync="isLoading"></loading>
    <h3 class="text-center">購物車</h3>
    <table class="table my-5">
      <thead>
        <th class="text-center">照片</th>
        <th class="text-center" width="450">品名</th>
        <th class="text-center" width="80">尺寸</th>
        <th class="text-center" width="80">單價</th>
        <th class="text-center" width="80">數量</th>
        <th class="text-center" width="80">小計</th>
        <th class="text-center" width="80">刪除</th>
      </thead>
      <tbody>
        <tr v-for="item in carts.carts">
          <td class="align-middle text-center">
            <img class="carts_img" :src="item.product.imageUrl" alt="ptoduct image">
          </td>
          <td class="align-middle text-center">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
            </div>
          </td>
          <td class="align-middle text-center">
          {{ item.product.size }}</td>
          <td class="align-middle text-center">
          {{ item.product.price | currency }}</td>
          <td class="align-middle text-center">
          {{ item.qty }}件</td>
          <td class="align-middle text-center">
          {{ item.total | currency }}</td>
          <td class="align-middle text-center">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <span class="col-sm-12 text-danger text-center my-3">※商品僅提供宅配服務(免運費)</span>
      <div class="col-sm-6 input-group input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
        <div class="input-group-append d-flex">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
      <div class="col-sm-3 text-center">
        <div>總計<span class="px-2 ml-3">{{ carts.total | currency }}</span></div>
        <div class="text-success" v-if="carts.total !== carts.final_total">折扣價
        <span class="px-2">{{ carts.final_total | currency }}</span></div>
      </div>
      <div class="col-sm-3 text-center">
        <router-link class="btn btn-primary px-5 py-2" to="/order">
          結帳去
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Carts",
    data() {
      return {
        coupon_code: ""
      }
    },
    computed: {
      isLoading() {
      return this.$store.state.isLoading;
      },
      carts() {
        return this.$store.state.carts;
      }
    },
    methods: {
      removeCartItem(id) {
        this.$store.dispatch("removeCartItem", id);
      },
      addCouponCode() {
        const coupon = { code: this.coupon_code };
        this.$store.dispatch("addCouponCode", coupon);
        this.coupon_code = "";
      }
    }
  }
</script>
