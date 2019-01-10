<template>
  <div class="about">
    <Alert></Alert>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-5 font-weight-normal text-center">請輸入帳號密碼</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" v-model="user.username" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" v-model="user.password" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">登入</button>
    </form>
  </div>
</template>

<script>
import Alert from "../components/AlertMessage";

export default {
  name: "Signin",
  components:{
    Alert
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      const vm = this;
      vm.$http.post(api, vm.user).then(res => {
        if (res.data.success) {
          vm.$store.commit('SIGNIN', true);
          vm.$router.push("/");
        } else {
          vm.$store.dispatch("alertMessage", res);
        }
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
