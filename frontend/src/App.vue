<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  import Header from "./components/Header.vue";

  import { getToken } from './helpers/token-getter';
  import { authenticateUser } from './helpers/user-getter';
  import { clearSession } from './helpers/clear-session';

  @Component({ components: { Header } })
  export default class App extends Vue {
    mounted() {
      if( getToken() ) {
        authenticateUser()
          .then(user => this.$store.dispatch('setUser', user))
          .catch( clearSession() );
      }
      else clearSession();
    }
  };
</script>

<style lang="scss">
  @import './assets/styles/main';
</style>
