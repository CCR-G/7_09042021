<template>
    <article>
        <PostContent v-bind:post='post' />
        <button v-if="is_admin" v-on:click="erasePost" class="button delete-button">Supprimer</button>
        <p>{{ error }}</p>

        <button
            v-if="!show_comment_form"
            v-on:click="displayCommentForm"
            class="button"
        >
            Ajouter un commentaire
        </button>
        
        <NewComment
            v-if="show_comment_form"
            v-bind:post='post'
            v-on:cancel="show_comment_form = false"
            v-on:new-comment-posted="addComment"
        />

        <CommentsList v-if="post.comments_number > 0" v-bind:comments_list="this.post.comments"/>
        
        <button
            type="button"
            v-if='!are_all_comments_shown'
            v-on:click="showAllComments"
            class="button more-comments"
        >
            Afficher le reste des commentaires ({{ post.comments_number - 1 }})
        </button>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { CommentType, PostClass } from "../../../types";
    
    import PostContent from './PostContent.vue';
    import NewComment from './NewComment.vue';
    import CommentsList from './CommentsList.vue';
    import { getAllComments } from "../../../helpers/comment-getter";
    import { deletePost } from "../../../helpers/post-getter";

    @Component({
      components: { PostContent, NewComment, CommentsList }
    })
    export default class Post extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private post!: PostClass;
        @Prop() private position_in_array!: number;

        private are_all_comments_shown = false;
        private show_comment_form = false;
        private is_admin = this.$store.state.user.admin;
        private error = '';

        mounted() {
            this.are_all_comments_shown = !(this.post.comments_number > 1);
        }

        displayCommentForm() {
            this.show_comment_form = true;
            this.are_all_comments_shown = true;
        }

        showAllComments() {
            getAllComments(this.post.id).then(comments => this.post.comments = comments);
            this.are_all_comments_shown = true;
        }

        addComment(new_comment: CommentType) {
            this.post.comments_number ++;
            this.post.comments.unshift(new_comment);
        }

        erasePost() {
            deletePost(this.post.id)
                .then(() => {
                    this.$emit("post-deleted", this.position_in_array);
                    this.error = '';
                })
                .catch((err) => {
                    this.error = err.message;
                })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
