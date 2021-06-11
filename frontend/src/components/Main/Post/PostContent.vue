<template>
    <div class="post-content">
        <header class="post-header">
            <p class="post-author">{{ post.author }}</p>
            <time v-bind:datetime=post.postdate>{{ post.postdate }}</time>
        </header>

        <div class="post-image-container">
            <img
                v-if="is_image_valid"
                v-bind:src="post.image_url"
                v-on:error="invalidateImage"
                class="post-image"
            />
        </div>

        <p class="text-content">{{ post.content }}</p>

    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { PostClass } from "../../../types";

    @Component
    export default class PostContent extends Vue {
        //We need to create a Post class or interface that contains 
        // an author, a date, a content, comments
        @Prop() private post!: PostClass;

        is_image_valid = false;

        mounted() {
            this.is_image_valid = !!(this.post.image_url);
        }

        invalidateImage() {
            this.is_image_valid = false;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
