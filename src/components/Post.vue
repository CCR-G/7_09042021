<template>
    <article>
        <header>
            <p>{{ author }}</p>
            <time datetime="2015-05-16 19:00">Date</time>
        </header>
        <p>{{ content }}</p>

        <!--If too long-->
        <button v-if='content.length > 10'>Afficher la suite…</button>

        <form>
            <label>Commenter
                <textarea v-model='newcomment'></textarea>
            </label>
            <input type="reset">
            <input type="submit">
        </form>

        <!--If comment.s-->
        <ul v-if='comments.length > 0'>
            <!--For each comments-->
            <li v-for="comment in comments" v-bind:key="comment.content">
                <header>
                    <p>{{ comment.author }}</p>
                </header>
                <p>{{ comment.content }}</p>
            </li>
        </ul>

        <button type="button" v-if='comments.length > 2'>Plus de commentaires</button>
        <!--If more than one-->
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class Post extends Vue {
        newcomment = ''
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private content!: string;
        @Prop() private author!: string;
        @Prop() private comments!: string[];
    }
</script>