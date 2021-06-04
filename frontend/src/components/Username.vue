<template>
    <p>{{ username }}</p>
</template>

<script lang="ts">
    import { Prop, Component, Vue } from "vue-property-decorator";

    @Component
    export default class Username extends Vue {
        @Prop() private username!: string;
    }
</script>
