<template>
  <main>
    <NewPost />
    <NewsFeed />
  </main>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NewPost from '../components/Main/NewPost.vue';
    import NewsFeed from '../components/Main/NewsFeed.vue';

    @Component({
      components: { NewPost, NewsFeed }
    })
    export default class Main extends Vue {
    }
</script>
