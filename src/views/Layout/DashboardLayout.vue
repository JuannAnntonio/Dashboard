<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            path: '/dashboard',
            icon: 'fa fa-chart-pie' // text-primary- ni ni-personal_video
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Datos',
            path: '/datos',
            icon: 'ni ni-bullet-list-67'
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Administración',
            path: '/administracion',
            icon: 'fa fa-users-cog'
          }"
        >
        </sidebar-item>

      </template>

      <template slot="links-after">
        <sidebar-item
          :link="{
            name: 'Clientes',
            path: '/clientes',
            icon: 'fa fa-user-friends'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Sucursales',
            path: '/sucursales',
            icon: 'fa fa-store-alt'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Dispositivos',
            path: '/dispositivos',
            icon: 'fa fa-tablet-alt'//camera-retro
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>

    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    }
  },
  mounted() {
    this.initScrollbar();
  }
};
</script>
<style lang="scss"></style>
