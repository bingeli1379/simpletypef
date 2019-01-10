<template>
  <div class="container page_height py-5">
    <div class="row justify-content-center">
      <h3 class="text-center col-md-12">購買人資訊</h3>
      <form class="col-md-6 my-5" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-model="form.user.email" v-validate="'required|email'" :class="{'is-invalid' : errors.has('email')}" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email')}}</span>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            v-model="form.user.name" v-validate="'required'" :class="{'is-invalid' : errors.has('name')}" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
        </div>
      
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" name="tel" id="usertel" v-model="form.user.tel"
          v-validate="'required'" :class="{'is-invalid' : errors.has('tel')}" placeholder="請輸入電話">
          <span class="text-danger" v-if="errors.has('tel')">請輸入電話</span>
        </div>
      
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            v-validate="'required'" :class="{'is-invalid' : errors.has('address')}" placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">請輸入地址</span>
        </div>
      
        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="5" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-primary">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    }
  },
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/order`;
      const order = vm.form;
      vm.$validator.validate().then(result => {
        if (result) {
          vm.$http.post(api, { data: order }).then(res => {
            vm.$store.dispatch("getCart");
            vm.$router.push(`/checkout/${res.data.orderId}`);
          });
        } else {
          vm.$store.dispatch("alertMessage", { data : {
            message: "欄位不完整",
            status: "danger"
          }});
        }
      });
    }
  }
}
</script>