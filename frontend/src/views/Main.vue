<template>
  <main>
    <NewPost v-on:post-created="addPost" />
    <NewsFeed v-bind:posts="posts" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewPost from "../components/Main/NewPost.vue";
import NewsFeed from "../components/Main/NewsFeed.vue";
import { getPosts } from "../helpers/post-getter";
import { PostClass } from "../types";

@Component({
  components: { NewPost, NewsFeed },
})
export default class Main extends Vue {
  private posts: PostClass[] = [];

  mounted() {
    getPosts()
      .then((posts) => {
        this.posts = posts;
      })
      .catch((error) => console.log("COULD NOT RETRIEVE POSTS"));
  }

  addPost(new_post: PostClass) {
    this.posts.unshift(new_post);
  }
}
</script>
