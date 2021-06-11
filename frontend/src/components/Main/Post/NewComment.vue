<template>
    <form class="comment-form">
        <div class="comment-form-fields">
            <textarea class="form-field new-comment-field" aria-label="Entrez un commentaire" v-model='new_comment.content'></textarea>
            <fieldset class="new-comment-buttons">
                <input type="reset" value="Annuler" v-on:click="cancel" class="button cancel">
                <button v-on:click="addComment" type="button" class="button">Commenter</button>
            </fieldset>
        </div>
        <p v-if="error">{{ error }}</p>
    </form>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { postNewComment } from "../../../helpers/comment-getter";
    import { PostClass, CommentType } from "../../../types";

    @Component
    export default class NewComment extends Vue {
        @Prop() private post!: PostClass;

        private error = '';

        private new_comment: CommentType = {
            author: this.$store.state.user.id,
            content: "",
            post: this.post.id
        };

        addComment(): void {
            postNewComment(this.new_comment)
            .then(() => {
                this.$emit("new-comment-posted",  { ...this.new_comment, author: this.$store.state.user.username });
                this.new_comment.content = '';
            })
            .catch(err => { this.error = err.message })
        }

        cancel() {
            this.$emit("cancel");
        }
    }
</script>
