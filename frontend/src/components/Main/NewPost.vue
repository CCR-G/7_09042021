<template>
    <section>
        <h1 id="write-post-title">Rédiger un post</h1>
        <form>
            <textarea aria-labelledby="write-post-title" v-model="content"></textarea>

            <label for="post-image-url">URL d'une image (optionnel) :</label>
            <input class="post-image-url" id="post-image-url" type="url" placeholder="https://giphy.gif" v-model="new_post.image_url">

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
    import { PostClass } from "../../types";

    @Component
    export default class NewPost extends Vue {
        new_post = {
            content: '',
            image_url: ''
        }

        error = '';

        get user() {
            return this.$store.state.user;
        }

        //should return true or something if created properly in db
        createPost(): void {
            //this.$emit('new-post-created', this.content);
            postNewPost(this.new_post.content, this.user.id, this.new_post.image_url)
                .then((post) => {
                    this.$emit("post-created", new PostClass(
                        post.created_post.id,
                        this.new_post.content,
                        this.user.username,
                        new Date(Date.now()),
                        0,
                        [],
                        this.new_post.image_url
                    ));

                    this.new_post.content = '';
                    this.new_post.image_url = '';
                    this.error = '';
                })
                .catch((err) => {
                    this.error = err.message;
                    console.log("Something went wrong with your new post… Please try again. ")
                })
        }
    }
</script>
