<template>
  <section>
    <form class="post-form">
      <h1 id="write-post-title">Rédiger un article</h1>
      <textarea
        class="form-field new-post-field"
        aria-labelledby="write-post-title"
        v-model="new_post.content"
        placeholder="Mon article rédigé…"
      ></textarea>

      <label for="post-image-url">URL d'une image (optionnel) :</label>
      <input
        class="form-field new-post-field"
        id="post-image-url"
        type="url"
        placeholder="https://giphy.gif"
        v-model="new_post.image_url"
      />

      <fieldset class="new-post-buttons">
        <input type="reset" value="Annuler" class="button cancel" />
        <button type="button" v-on:click="createPost" class="button">
          Publier
        </button>
      </fieldset>
      <p v-if="error">{{ error }}</p>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { postNewPost } from "../../helpers/post-getter";
import { PostClass } from "../../types";

@Component
export default class NewPost extends Vue {
  new_post = {
    content: "",
    image_url: "",
  };

  error = "";

  get user() {
    return this.$store.state.user;
  }

  createPost(): void {
    postNewPost(this.new_post.content, this.user.id, this.new_post.image_url)
      .then((post) => {
        this.$emit(
          "post-created",
          new PostClass(
            post.created_post.id,
            this.new_post.content,
            this.user.username,
            new Date(Date.now()),
            0,
            [],
            this.new_post.image_url
          )
        );

        this.new_post.content = "";
        this.new_post.image_url = "";
        this.error = "";
      })
      .catch((err) => {
        this.error = err.message;
        console.log(
          "Something went wrong with your new post… Please try again. "
        );
      });
  }
}
</script>
