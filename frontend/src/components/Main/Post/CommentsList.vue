<template>
    <section class="comments-section">
        <ul class="comments-list">
            <li
                is="Comment"
                v-for="(comment, index) in comments_list"
                v-bind:key="comment.id"
                v-bind:position_in_array="index"
                v-bind:comment="comment"
                v-on:comment-deleted="deleteComment"
            />
        </ul>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { CommentType } from '../../../types';
    import Comment from './Comment.vue';

    @Component({
      components: { Comment }
    })
    export default class CommentsList extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private comments_list!: CommentType[];

        deleteComment(comment_key_in_array) {
            this.comments_list.splice(comment_key_in_array, 1);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
