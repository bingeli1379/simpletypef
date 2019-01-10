<template>
  <nav class="d-md-block sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column text-center my-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/all">全部</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/coat">外套</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/clothes">上衣</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/pants">下身</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/bag">包款</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shopping/accessory">配件</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.router-link-exact-active{
  color: #17a2b8 !important;
}   
</style>
