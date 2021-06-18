<template>
  <section>
    <form>
      <label>
        Adresse e-mail
        <input type="email" v-model="user.email" />
      </label>
      <button type="submit" class="button">Modifier</button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../../types";

@Component
export default class EditEmailAddress extends Vue {
  @Prop() private user!: User;
}
</script>
