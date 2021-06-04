<template>
    <header>
        <div class="logo-container">
            <img alt="Logo de Groupomania" src="../../assets/icon-left-font.svg" width="200"/>
        </div>
        <Menu />
        <p v-if="username">{{ username }}</p>
    </header>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Menu from "./Menu.vue";

  @Component({ components: { Menu } })
  export default class App extends Vue {
    get username() {
      return this.$store.state.user.username;
    }
  };
</script>
