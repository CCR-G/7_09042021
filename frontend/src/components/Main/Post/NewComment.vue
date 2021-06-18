<template>
  <form class="comment-form">
    <button
      v-if="!show_comment_form"
      v-on:click="displayCommentForm"
      class="button show-comment-form"
      ref="openCommentFormButton"
    >
      Ajouter un commentaire
    </button>

    <div v-if="show_comment_form" class="comment-form-fields">
      <textarea
        class="form-field new-comment-field"
        aria-label="Entrez un commentaire"
        v-model="new_comment.content"
        ref="newCommentTextarea"
      ></textarea>
      <fieldset class="new-comment-buttons">
        <input
          type="reset"
          value="Annuler"
          v-on:click="close"
          class="button cancel"
        />
        <button v-on:click="addComment" type="button" class="button">
          Commenter
        </button>
      </fieldset>
    </div>

    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { postNewComment } from "../../../helpers/comment-getter";
import { PostClass, CommentType } from "../../../types";

@Component
export default class NewComment extends Vue {
  @Prop() private post!: PostClass;
  @Ref() readonly newCommentTextarea!: HTMLTextAreaElement;
  @Ref() readonly openCommentFormButton!: HTMLButtonElement;

  private show_comment_form = false;
  private error = "";

  private new_comment: CommentType = {
    author: this.$store.state.user.id,
    content: "",
    post: this.post.id,
  };

  displayCommentForm() {
    this.show_comment_form = true;
    this.$nextTick(() => this.newCommentTextarea.focus());
  }

  addComment(): void {
    postNewComment(this.new_comment)
      .then(() => {
        this.$emit("new-comment-posted", {
          ...this.new_comment,
          author: this.$store.state.user.username,
        });
        this.close();
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

  close() {
    this.new_comment.content = "";
    this.error = "";
    this.show_comment_form = false;
    this.$nextTick(() => this.openCommentFormButton.focus());
  }
}
</script>
