<template>
  <section>
    <button
      type="button"
      v-if="!is_editing"
      v-on:click="toggleEditingForm"
      class="button"
    >
      Modifier le mot de passe
    </button>

    <form v-if="is_editing">
      <label>
        Mot de passe actuel
        <input type="password" />
      </label>
      <label>
        Nouveau mot de passe
        <input type="password" />
      </label>
      <button type="submit" class="button">Modifier</button>
      <button type="reset" v-on:click="toggleEditingForm" class="button cancel">
        Annuler
      </button>
    </form>

    <p v-if="has_been_edited">Le mot de passe a été modifié avec succès</p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditPassword extends Vue {
  is_editing = false;
  has_been_edited = false;

  toggleEditingForm(): void {
    this.is_editing = !this.is_editing;
  }
}
</script>
