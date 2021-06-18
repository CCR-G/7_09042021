<template>
  <li class="comment">
    <header>
      <p class="comment-author">{{ comment.author }}</p>
    </header>
    <p class="text-content">{{ comment.content }}</p>
    <button
      v-if="is_admin"
      v-on:click="eraseComment"
      class="button delete-button"
    >
      Supprimer le commentaire
    </button>
    <p v-if="error">{{ error }}</p>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { deleteComment } from "../../../helpers/comment-getter";
import { CommentType } from "../../../types";

@Component
export default class Comment extends Vue {
  @Prop() private comment!: CommentType;
  @Prop() private position_in_array!: number;

  error = "";

  private is_admin = this.$store.state.user.admin;

  eraseComment() {
    if (!this.comment.id) {
      this.error = "Comment id is not defined…";
      return;
    }

    deleteComment(this.comment.id)
      .then(() => {
        this.$emit("comment-deleted", this.position_in_array);
        this.error = "";
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
