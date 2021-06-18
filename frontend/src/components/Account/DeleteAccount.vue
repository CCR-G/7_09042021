<template>
  <section>
    <button
      type="button"
      v-if="!is_deleting"
      v-on:click="openDeletingForm"
      class="button account-button"
      ref="deleteAccountFormButton"
    >
      Supprimer le compte
    </button>

    <form v-else>
      <label>
        Entrez votre mot de passe :
        <input type="password" v-model="password" class="connection-field" ref="passwordInput" />
      </label>

      <fieldset class="delete-account-buttons">
        <button type="button" v-on:click="deleteAccount" class="button">
          Confirmer la suppression du compte
        </button>
        <button
          type="reset"
          v-on:click="closeDeletingForm"
          class="button cancel"
        >
          Annuler
        </button>
      </fieldset>

      <p>{{ error }}</p>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { deleteUser } from "../../helpers/user-getter";

@Component
export default class DeleteAccount extends Vue {
  @Ref() readonly deleteAccountFormButton!: HTMLButtonElement;
  @Ref() readonly passwordInput!: HTMLInputElement;

  is_deleting = false;
  private password = "";
  private error = "";

  openDeletingForm(): void {
    this.is_deleting = true;
    this.$nextTick(() => this.passwordInput.focus());
  }

  closeDeletingForm(): void {
    this.is_deleting = false;
    this.$nextTick(() => this.deleteAccountFormButton.focus());
  }

  deleteAccount(): void {
    deleteUser(this.$store.state.user.id, this.password)
      .then((res) => {
        this.password = "";
        this.error = "";

        sessionStorage.removeItem("token");
        this.$router.replace("/register");
        this.$store.dispatch("clearUser");
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
</script>
