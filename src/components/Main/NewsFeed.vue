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
    import { PostClass, CommentType } from '../../types';
    import Post from './Post/Post.vue';
    import NewPost from './NewPost.vue';

    @Component({
      components: { NewPost, Post }
    })
    export default class NewsFeed extends Vue {
      posts: PostClass[] = [];

      mounted() {
        this.getPosts();
      }

      async getPosts() {
          const api_response = await fetch('http://localhost:3000/posts');

          if (!api_response.ok) {
            throw new Error(`Error ${api_response.status} : List of posts could not be retrieved.`);
          }

          let posts_list: PostClass[] = [];

          const json_posts_list = await api_response.json();
          json_posts_list.forEach(async json_post => {

            const comments_list = await this.getComments(json_post.id);

            posts_list.push(new PostClass(
                json_post.id,
                json_post.content,
                json_post.user,
                json_post.postdate,
                comments_list
            ));
          });

          this.posts = posts_list;
      }

      private async getComments(post_id): Promise<CommentType[]> {
        const comments_request = await fetch(`http://localhost:3000/posts/${post_id}/comments`);
        if (!comments_request.ok) {
          throw new Error(`Error ${comments_request.status} : List of commments could not be retrieved.`);
        }

        let comments_list: CommentType[] = [];

        const json_comments_list = await comments_request.json();
        json_comments_list.forEach(json_comment => {
          comments_list.push({
              author: json_comment.author,
              content: json_comment.content
            });
        });

        return comments_list;
      }
    }
</script>
