<template>
  <div class="h-100">
    <Navbar></Navbar>
    <Alert></Alert>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Alert from "../components/AlertMessage";

export default {
  name: "Dashboard",
  components:{
    Navbar,
    Footer,
    Alert
  }
};
</script>
