<template>
    <article>
        <PostContent v-bind:post='post' />

        <button v-if="!show_comment_form" v-on:click="displayCommentForm">Ajouter un commentaire</button>
        <NewComment v-if="show_comment_form" v-bind:post='post' />

        <button v-if="!show_comments" v-on:click="displayComments">Voir tous les commentaires</button>
        <CommentsList v-if="show_comments" v-bind:comments_list='post.comments' />
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

        private show_comments = false;
        private show_comment_form = false;

        displayCommentForm() {
            this.show_comment_form = true;
            this.show_comments = true;
        }

        displayComments() {
            this.show_comments = true;
        }
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
