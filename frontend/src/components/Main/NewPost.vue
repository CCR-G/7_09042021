<template>
    <section>
        <h1 id="write-post-title">Rédiger un post</h1>
        <form>
            <textarea aria-labelledby="write-post-title" v-model="content"></textarea>
            <fieldset class="save-cancel-buttons">
                <input type="reset" value="Effacer">
                <button type="button" v-on:click="createPost" class="button">Poster</button>
            </fieldset>
            <p v-if="error">{{ error }}</p>
        </form>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { postNewPost } from "../../helpers/post-getter";

    @Component
    export default class NewPost extends Vue {
        content = '';
        error = '';

        get user() {
            return this.$store.state.user;
        }

        //should return true or something if created properly in db
        createPost(): void {
            //this.$emit('new-post-created', this.content);
            postNewPost(this.content, this.user.id)
                .then((post) => {
                    this.$emit("new-post-created", {
                        // We should use deconstruction (...) to replace only author to the response
                        id: post.id,
                        content: this.content,
                        author: this.user,
                        postdate: post.date,
                        comments_number: 0,
                        comments: []
                    });
                    this.content = '';
                    this.error = '';
                })
                .catch((err) => {
                    this.error = err.message;
                    console.log("Something went wrong with your new post… Please try again. ")
                })
        }
    }
</script>
