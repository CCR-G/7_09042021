<template>
    <form>
        <label>Commenter
            <textarea v-model='new_comment_content'></textarea>
        </label>
        <input type="reset">
        <input v-on:click="addComment" type="submit">
    </form>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { PostClass } from "../../../types";

    @Component
    export default class NewComment extends Vue {
        @Prop() private post!: PostClass;

        new_comment_content = '';

        addComment() {
            this.post.comments.push({author: "comment author", content: this.new_comment_content});
        }
    }
</script>
