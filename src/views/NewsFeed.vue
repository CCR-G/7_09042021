<template>
  <div>
    <!--
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    -->
    <Post content='Post content' author='Post author' v-bind:comments="comments"/>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import Post from "../components/Post.vue";

    @Component({
      components: { Post }
    })
    export default class NewsFeed extends Vue {
      comments = [
          { content: "first comment", author: "Sarah" },
          { content: "third comment", author: "Michelle" },
          { content: "second comment", author: "Paul" }
        ]
    }
</script>
