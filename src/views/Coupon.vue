<template>
  <div class="container page_height p-5">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">新增優惠券</button>
    </div>
    <table class="table my-5">
      <thead>
        <th class="text-center">名稱</th>
        <th class="text-center">優惠碼</th>
        <th class="text-center" width="150">折扣百分比</th>
        <th class="text-center" width="150">到期日</th>
        <th class="text-center" width="80">編輯</th>
        <th class="text-center" width="80">刪除</th>
      </thead>
      <tbody class="border-bottom">
        <tr v-for="item in coupons">
          <td class="align-middle text-center">
            {{ item.title }}
          </td>
          <td class="align-middle text-center">
            {{ item.code }}
          </td>
          <td class="align-middle text-center">
            {{ item.percent }}%
          </td>
          <td class="align-middle text-center">
            {{ item.due_date }}
          </td>
          <td class="align-middle text-center">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          </td>
          <td class="align-middle text-center">
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example" v-if="pagination !== ''">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click="getCoupons(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{'active': pagination.current_page === page}"><a class="page-link" href="#" @click="getCoupons(page)">{{ page }}</a></li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click="getCoupons(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="modal fade mt-5" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                    placeholder="請輸入標題">
                </div>
                <div class="form-group">
                  <label for="title">優惠碼</label>
                  <input type="text" class="form-control" id="title" v-model.trim="tempCoupon.code"
                    placeholder="請輸入優惠碼">
                </div>
                <div class="form-group">
                  <label for="title">到期日</label>
                  <input type="date" class="form-control" id="title" v-model="tempCoupon.due_date">
                </div>
                <div class="form-group">
                  <label for="title">折扣百分比</label>
                  <input type="number" class="form-control" id="title" v-model="tempCoupon.percent"
                    placeholder="請輸入折扣百分比">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade mt-5" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Coupon",
  data() {
    return {
      tempCoupon: {},
      isNew: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    coupons() {
      return this.$store.state.coupons;
    }
  },
  methods: {
    getCoupons(page = 1) {
    this.$store.dispatch('getCoupons', page);
    },
    openModal(isNew, item) {
    if (isNew) {
      this.tempCoupon = {};
      this.isNew = true;
    } else {
      this.tempCoupon = Object.assign({}, item);
      this.isNew = false;
    }
    $("#couponModal").modal("show");
    },
    openDelModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $("#delCouponModal").modal("show");
    },
    delCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(api).then(res => {
        if (res.data.success) {
          $("#delCouponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#delCouponModal").modal("hide");
          vm.$store.dispatch("alertMessage", res);
        }
      })
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon`;
      const vm = this;
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(res => {
        if (res.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupons();
        } else {
          vm.$store.dispatch("alertMessage", res);
        }
      });
    }
  },
  created() {
    this.getCoupons();
  }
}
</script>
