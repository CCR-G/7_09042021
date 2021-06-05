<template>
    <section class="comments-section">
        <ul class="comments-list">
            <li v-for="comment in comments_list" v-bind:key="comment.content">
                <header>
                    <p>{{ comment.author }}</p>
                </header>
                <p>{{ comment.content }}</p>
                <button v-if="is_admin" class="button delete-button">Supprimer</button>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { CommentType } from '../../../types';

    @Component
    export default class CommentsList extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private comments_list!: CommentType[];

        private is_admin = this.$store.state.user.admin;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
