<template>
    <p>{{ username }}</p>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Username extends Vue {
        get username() {
            return this.$store.state.user.username;
        }
    }
</script>
