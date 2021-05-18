<template>
    <article>
        <PostContent v-bind:post='post' />

        <button v-if="!show_comment_form" v-on:click="displayCommentForm">Ajouter un commentaire</button>
        <NewComment v-if="show_comment_form" v-bind:post='post' v-on:cancel="show_comment_form = false" v-on:new-comment-posted="addComment"/>

        <CommentsList v-if="post.comments_number > 0" v-bind:comments_list="comments_list"/>
        <button type="button" v-if='post.comments_number > 1' v-on:click="showAllComments">Afficher le reste des commentaires ({{post.comments_number - 1}})</button>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { PostClass } from "../../../types";
    
    import PostContent from './PostContent.vue';
    import NewComment from './NewComment.vue';
    import CommentsList from './CommentsList.vue';
    import { getAllComments } from "../../../helpers/comment-getter";

    @Component({
      components: { PostContent, NewComment, CommentsList }
    })
    export default class Post extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private post!: PostClass;

        private show_all_comments = false;
        private show_comment_form = false;

        private comments_list = this.post.comments;

        displayCommentForm() {
            this.show_comment_form = true;
            this.show_all_comments = true;
        }

        showAllComments() {
            getAllComments(this.post.id).then(comments => this.comments_list = comments);
            this.show_all_comments = true;
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
