<template>
    <section>
        <h1 id="write-post-title">Rédiger un post</h1>
        <form>
            <textarea aria-labelledby="write-post-title" v-model="newpost"></textarea>
            <input type="reset" value="Effacer">
            <button type="submit" v-on:click="createPost">Poster</button>
        </form>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class NewPost extends Vue {
        newpost = '';

        get author() {
            return "Florence Machine";
        }

        //should return true or something if created properly in db
        createPost(): void {
            this.$emit('new-post-created', this.newpost);
        }
    }
</script>
