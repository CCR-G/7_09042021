<template>
  <section>
    <form>
      <label>
        Nom d'utilisateur
        <input type="text" v-model="user.username" />
      </label>
      <button type="submit" class="button">Modifier</button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../../types";

@Component
export default class EditUsername extends Vue {
  @Prop() private user!: User;
}
</script>
