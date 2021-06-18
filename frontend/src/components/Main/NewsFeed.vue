<template>
  <section>
    <h1>Fil d'actualité</h1>
    <p v-if="!posts || posts.length === 0">There are no post to show.</p>
    <Post
      v-for="(post, index) in posts"
      v-bind:key="post.id"
      v-bind:position_in_array="index"
      v-bind:post="post"
      v-on:post-deleted="deletePost"
    />
  </section>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { PostClass } from "../../types";
import Post from "./Post/Post.vue";
import NewPost from "./NewPost.vue";

@Component({
  components: { NewPost, Post },
})
export default class NewsFeed extends Vue {
  @Prop() private posts!: PostClass[];

  deletePost(post_key_in_array: number) {
    this.posts.splice(post_key_in_array, 1);
  }
}
</script>
