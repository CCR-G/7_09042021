<template>
  <div id="app">
    <header>
      <Logo />
      <Menu />
    </header>

    <router-view />
  </div>
</template>

<script>
  import Logo from "@/components/Logo.vue";
  import Menu from "@/components/Menu.vue";

  export default {
    name: "App",
    components: {
      Logo,
      Menu
    },
  };
</script>

<style lang="scss">
</style>
