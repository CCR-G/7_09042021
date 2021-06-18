<template>
  <div>
    <h1 class="connection-title">Créer un compte</h1>

    <form class="connection-form">
      <label class="connection-field">
        Identifiant
        <input type="text" v-model="user.username" />
      </label>
      <label class="connection-field">
        Adresse email
        <input type="email" v-model="user.email" />
      </label>
      <label class="connection-field">
        Mot de passe
        <input type="password" v-model="user.password" />
      </label>
      <button type="button" v-on:click="createNewUser" class="button">
        Inscription
      </button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RegistrationInformation, User } from "../types";
import { postNewUser } from "../helpers/user-getter";
import router from "../router";

@Component
export default class EditPassword extends Vue {
  user: RegistrationInformation = {
    email: "",
    username: "",
    password: "",
  };

  error = "";

  createNewUser() {
    postNewUser(this.user)
      .then((response) => {
        sessionStorage.setItem("token", response.token);
        this.$store.dispatch("setUser", {
          id: response.user.id,
          username: this.user.username,
          email: this.user.email,
          admin: response.user.admin,
        });

        router.replace("/");

        this.user.email = "";
        this.user.username = "";
        this.user.password = "";

        this.error = "";
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
</script>
