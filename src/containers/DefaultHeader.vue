<template>
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/amm_logo.jpg" width="50" height="50" alt="AJAMS">AJAMS
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <!--<b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>-->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">

      </b-navbar-nav>
      <!--<AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
</template>
<script>
import { Header as AppHeader, SidebarToggler } from '@coreui/vue'

export default {
  name: 'DefaultHeader',
  components: {
    AppHeader,
    SidebarToggler
  }
}
</script>
