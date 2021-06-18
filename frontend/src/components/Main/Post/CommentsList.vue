<template>
  <section class="comments-list-section">
    <ul v-if="this.post.comments.length > 0" class="comments-list">
      <Comment
        v-for="(comment, index) in this.post.comments"
        v-bind:key="comment.id"
        v-bind:position_in_array="index"
        v-bind:comment="comment"
        v-on:comment-deleted="deleteComment"
      />
    </ul>

    <button
      type="button"
      v-if="!are_all_comments_shown"
      v-on:click="showAllComments"
      class="button more-comments"
    >
      Afficher le reste des commentaires ({{ post.comments_number - 1 }})
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CommentType, PostClass } from "../../../types";

import Comment from "./Comment.vue";
import { getAllComments } from "../../../helpers/comment-getter";

@Component({
  components: { Comment },
})
export default class CommentsList extends Vue {
  @Prop() private post!: PostClass;

  private are_all_comments_shown = false;

  mounted() {
    this.are_all_comments_shown = !(this.post.comments_number > 1);
  }

  showAllComments() {
    getAllComments(this.post.id).then(
      (comments) => (this.post.comments = comments)
    );
    this.are_all_comments_shown = true;
  }

  deleteComment(comment_key_in_array: number) {
    this.post.comments.splice(comment_key_in_array, 1);
  }
}
</script>
