<template>
    <section>
        <h1 id="write-post-title">Rédiger un post</h1>
        <form>
            <textarea aria-labelledby="write-post-title" v-model="content"></textarea>
            <input type="reset" value="Effacer">
            <button type="button" v-on:click="createPost">Poster</button>
        </form>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class NewPost extends Vue {
        content = '';

        get postdate() {
            return "2020-01-01 00:00:00";
        };

        get user() {
            return 1;
        }

        //should return true or something if created properly in db
        createPost(): void {
            //this.$emit('new-post-created', this.content);
            this.postNewPost();
        }

        async postNewPost() {
            const request = await fetch(`http://localhost:3000/posts`, {
                method: "POST",
                body: JSON.stringify({ content: this.content, user: this.user, postdate: this.postdate }),
                headers: { "Content-type": "application/json" }
            });

            if (!request.ok) {
                throw new Error(`Error ${request.status} : There has been a problem with your new post request.`);
            }
        }
    }
</script>
