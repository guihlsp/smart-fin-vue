<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :sidebar-item-color="sidebarBackground" :sidebar-background-image="sidebarBackgroundImage">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/movimentacoes">
        <md-icon>currency_exchange</md-icon>
        <p>Movimentações</p>
      </sidebar-link>
      <sidebar-link to="/contas_bancarias">
        <md-icon>account_balance</md-icon>
        <p>Contas bancárias</p>
      </sidebar-link>
      <sidebar-link to="/categorias">
        <md-icon>category</md-icon>
        <p>Categorias</p>
      </sidebar-link>
      <sidebar-link to="/formas_pagamento">
        <md-icon>payments</md-icon>
        <p>Formas de pagamento</p>
      </sidebar-link>
      <sidebar-link to="/tags">
        <md-icon>location_on</md-icon>
        <p>Tags</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>sync_alt </md-icon>
        <p>Transferências</p>
      </sidebar-link>
      <li class="md-list-item"> 
        <a class="md-list-item-container md-button-clean" @click="confirmacaoLogout()">
          <div class="md-list-item-content md-ripple">
            <md-icon>logout</md-icon>
            <p>Sair</p>
          </div>
        </a>
      </li>
    </side-bar>
    <md-dialog-confirm :md-active.sync="modalLogout" md-title="Sair" md-content="Tem certeza que deseja sair?"
      md-confirm-text="Confirmar" md-cancel-text="Cancelar" @md-cancel="onCancel" @md-confirm="onConfirm()" />

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage">
      </fixed-plugin>

      <dashboard-content> </dashboard-content>
      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
// import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/views/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    // ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      modalLogout: false,
    };
  },
  methods: {
    confirmacaoLogout() {
      this.modalLogout = true ;
    },
    onConfirm() {
      this.$api.post('/logout')
      .then (()=> {
        localStorage.removeItem("token")
        this.$router.push('/login')
      })
      .catch((error) => {
      console.error(error);
    });
    },
    onCancel() {
      this.modalLogout = false;
    },
  }
};
</script>
