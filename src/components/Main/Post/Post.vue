<template>
    <article>
        <PostContent v-bind:post='post' />
        <NewComment v-bind:post='post' />
        <CommentsList v-bind:comments_list='post.comments' />
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { PostClass } from "../../../types";
    
    import PostContent from './PostContent.vue';
    import NewComment from './NewComment.vue';
    import CommentsList from './CommentsList.vue';

    @Component({
      components: { PostContent, NewComment, CommentsList }
    })
    export default class Post extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private post!: PostClass;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
article {
    border: orange solid 1px;
    border-radius: 20px;
    margin: 15px;
    padding: 15px;
}
</style>
