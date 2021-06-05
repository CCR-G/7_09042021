<template>
    <section>
        <header>
            <p>{{ post.author }}</p>
            <time v-bind:datetime=post.postdate>{{ post.postdate }}</time>
        </header>
        <p>{{ post.content }}</p>

        <!--If too long : just css text-overflow:ellipsis and a button that changes that-->
        <button v-if='post.content.length > 50' class="show-more-content">Afficher la suite…</button>

        <button v-if="is_admin" class="button delete-button">Supprimer</button>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { PostClass } from "../../../types";

    @Component
    export default class PostContent extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private post!: PostClass;

        private is_admin = this.$store.state.user.admin;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
