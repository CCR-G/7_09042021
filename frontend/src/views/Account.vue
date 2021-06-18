<template>
  <div>
    <h1>Votre compte</h1>
    <button type="button" v-on:click="logout" class="button account-button">
      Se déconnecter
    </button>
    <DeleteAccount />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { clearSession } from "../helpers/clear-session";

import EditPassword from "../components/Account/EditPassword.vue";
import DeleteAccount from "../components/Account/DeleteAccount.vue";
import EditEmailAddress from "../components/Account/EditEmailAddress.vue";
import EditUsername from "../components/Account/EditUsername.vue";

@Component({
  components: { EditUsername, EditEmailAddress, EditPassword, DeleteAccount },
})
export default class Main extends Vue {
  logout(): void {
    clearSession();
    this.$router.replace("/login");
  }
}
</script>
