<template>
  <ul class="sidebar-menu">
    <li class="header">Навигация</li>
    <router-link tag="li" class="pageLink" to="/services">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Сервисы</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/diseases">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Услуги</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu'
}
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
