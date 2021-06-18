<template>
  <div>
    <h1 class="connection-title">Connexion</h1>

    <form class="connection-form">
      <label class="connection-field">
        Email
        <input type="email" v-model="user.email" />
      </label>
      <label class="connection-field">
        Mot de passe
        <input type="password" v-model="user.password" />
      </label>
      <button type="button" v-on:click="login" class="button">Connexion</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoginCredentials } from "../types";
import { loginUser } from "../helpers/user-getter";
import router from "../router/index";
import store from "../store/index";

@Component
export default class EditPassword extends Vue {
  user: LoginCredentials = {
    email: "",
    password: "",
  };

  error = "";

  login() {
    loginUser(this.user)
      .then((response) => {
        this.user.email = "";
        this.user.password = "";

        this.error = "";

        sessionStorage.setItem("token", response.token);
        this.$store.dispatch("setUser", response.user);
        router.replace("/");
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
</script>
