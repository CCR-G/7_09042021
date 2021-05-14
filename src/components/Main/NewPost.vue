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
    import { postNewPost } from "../../helpers/post-getter";

    @Component
    export default class NewPost extends Vue {
        content = '';

        get user() {
            return 1;
        }

        //should return true or something if created properly in db
        createPost(): void {
            //this.$emit('new-post-created', this.content);
            postNewPost(this.content, this.user)
        }
    }
</script>
