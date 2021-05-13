<template>
  <section>
    <h1>Fil d'actualité</h1>
    <p v-if="posts.length === 0">There are no post to show.</p>
    <div v-for="post in posts" v-bind:key="post.content">
        <Post v-bind:post='post' />
    </div>
  </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { PostClass } from '../../types';
    import Post from './Post/Post.vue';
    import NewPost from './NewPost.vue';
    import { getPosts } from "../../helpers/post-getter";

    @Component({
      components: { NewPost, Post }
    })
    export default class NewsFeed extends Vue {
      posts: PostClass[] = [];

      mounted() {
        getPosts().then((result) => {
          this.posts = result;
        });
      }
    }
</script>
