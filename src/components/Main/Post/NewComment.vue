<template>
    <form>
        <label>Commenter
            <textarea v-model='new_comment_content'></textarea>
        </label>
        <input type="reset">
        <button v-on:click="addComment" type="button">Commenter</button>
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

        addComment() {
            postNewComment({author: 1, content: this.new_comment_content, post: this.post.id }).then(result => { console.log(result) })
        }
    }
</script>
