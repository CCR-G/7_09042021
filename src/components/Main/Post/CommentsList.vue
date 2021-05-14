<template>
    <section v-if='comments_list.length > 0'>
        <ul v-if="comments_list.length === 1">
            <li>
                <header>
                    <p>{{ comments_list[0].comment_author }}</p>
                </header>
                <p>{{ comments_list[0].comment_content }}</p>
            </li>
        </ul>
        <ul v-if="comments_list.length > 1">
            <li v-for="comment in comments_list" v-bind:key="comment.comment_content">
                <header>
                    <p>{{ comment.comment_author }}</p>
                </header>
                <p>{{ comment.comment_content }}</p>
            </li>
        </ul>

        <button type="button" v-if='comments_list.length > 2'>Plus de commentaires</button>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { CommentType } from "../../../types";

    @Component
    export default class CommentsList extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private comments_list!: CommentType[];
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    section {
        border: black solid 1px;
        border-radius: 20px;
        margin: 15px;
        padding: 15px;
    }
</style>
