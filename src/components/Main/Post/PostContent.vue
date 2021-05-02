<template>
    <section>
        <header>
            <p>{{ author }}</p>
            <time v-bind:datetime=post.postdate>{{ post.postdate }}</time>
        </header>
        <p>{{ post.content }}</p>

        <!--If too long : just css text-overflow:ellipsis and a button that changes that-->
        <button v-if='post.content.length > 50'>Afficher la suite…</button>
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

        author = '';
        
        mounted() {
            this.getPostAuthor(this.post.author);
        }

        private async getPostAuthor(user_id): Promise<void> {
            const author_request = await fetch(`http://localhost:3000/users/${user_id}/username`);
            if (!author_request.ok) {
            throw new Error(`Error ${author_request.status} : Author could not be retrieved.`);
            }

            const author = await author_request.json();

            this.author = author.username;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    header p {
        font-weight: bold;
    }

    button {
        background-color: orange;
        border-radius: 20px;
        color: white;
    }
</style>
