<template>
  <article class="post">
    <div class="post-content">
      <header class="post-header">
        <div>
          <p class="post-author">{{ post.author }}</p>
          <time v-bind:datetime="post.postdate">{{ post.postdate }}</time>
        </div>

        <button
          v-if="is_admin"
          v-on:click="erasePost"
          class="button delete-button delete-post"
        >
          Supprimer l'article
        </button>
      </header>

      <div class="post-image-container">
        <img
          v-if="is_image_valid"
          v-bind:src="post.image_url"
          v-on:error="invalidateImage"
          alt=""
          class="post-image"
        />
      </div>

      <p class="text-content">{{ post.content }}</p>
    </div>

    <p v-if="error">{{ error }}</p>

    <hr />
    <NewComment v-bind:post="post" v-on:new-comment-posted="addComment" />

    <hr v-if="this.post.comments.length > 0" />
    <CommentsList v-bind:post="post" />
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CommentType, PostClass } from "../../../types";

import NewComment from "./NewComment.vue";
import CommentsList from "./CommentsList.vue";
import { deletePost } from "../../../helpers/post-getter";

@Component({
  components: { NewComment, CommentsList },
})
export default class Post extends Vue {
  @Prop() private post!: PostClass;
  @Prop() private position_in_array!: number;

  private is_admin = this.$store.state.user.admin;
  private error = "";
  private is_image_valid = false;

  mounted() {
    this.is_image_valid = !!this.post.image_url;
  }

  invalidateImage() {
    this.is_image_valid = false;
  }

  addComment(new_comment: CommentType) {
    this.post.comments.unshift(new_comment);
  }

  erasePost() {
    deletePost(this.post.id)
      .then(() => {
        this.$emit("post-deleted", this.position_in_array);
        this.error = "";
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
</script>
