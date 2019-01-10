<template>
  <div>
    <Carousel></Carousel>
    <Brand></Brand>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Brand from "../components/Brand";

export default {
  name: "Home",
  components:{
    Carousel,
    Brand
  }
};
</script>
