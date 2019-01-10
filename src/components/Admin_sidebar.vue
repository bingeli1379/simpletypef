<template>
  <nav class="d-md-block sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column text-center my-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/edit/all">全部</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/edit/coat">外套</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/edit/clothes">上衣</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/edit/pants">下身</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/edit/bag">包款</router-link>
        </li>
        <li class="nav-item border-bottom pb-2">
          <router-link class="nav-link" to="/admin/edit/accessory">配件</router-link>
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
