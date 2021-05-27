<template>
    <p>{{ username }}</p>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component
    export default class Username extends Vue {
        @Prop() private username!: string;
    }
</script>
