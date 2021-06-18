<template>
  <header class="site-header">
    <div class="logo-container">
      <router-link to="/" title="Go to homepage">
        <img
          alt="Logo de Groupomania"
          src="../assets/icon-left-font-tight.png"
          class="logo"
        />
      </router-link>
    </div>

    <nav v-if="!isLoggedIn">
      <router-link
        v-if="currentRoute !== '/register'"
        to="/register"
        class="button connection"
        >Register</router-link
      >
      <router-link
        v-if="currentRoute !== '/login'"
        to="/login"
        class="button connection"
        >Login</router-link
      >
    </nav>

    <router-link
      to="/account"
      v-if="username"
      class="button account"
      title="Go to your account page"
      >{{ username }}</router-link
    >
  </header>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
  get username() {
    return this.$store.state.user.username;
  }

  get isLoggedIn() {
    return !!this.$store.state.user.id;
  }

  get currentRoute() {
    return this.$route.path;
  }
}
</script>
