<template>
    <form>
            <textarea aria-label="Entrez un commentaire" v-model='new_comment_content'></textarea>
        <fieldset>
            <input type="reset" value="Annuler" v-on:click="cancel">
            <button v-on:click="addComment" type="button">Commenter</button>
        </fieldset>
        <p v-if="error">{{ error }}</p>
    </form>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { postNewComment } from "../../../helpers/comment-getter";
    import { PostClass } from "../../../types";

    @Component
    export default class NewComment extends Vue {
        @Prop() private post!: PostClass;

        new_comment_content = '';
        error = '';

        addComment() {
            postNewComment({author: this.$store.state.user.id, content: this.new_comment_content, post: this.post.id })
                .then(posted_comment => {
                    this.new_comment_content = '';
                    this.$emit("new-comment-posted", posted_comment);
                })
                .catch((err) => {
                    this.error = err;
                })
        }

        cancel() {
            this.$emit("cancel");
        }
    }
</script>
