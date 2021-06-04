<template>
    <div>
        <h1>Votre compte</h1>
        <EditUsername v-bind:user="user" />
        <EditEmailAddress v-bind:user="user" />
        <EditPassword v-bind:user="user" />
        <DeleteAccount v-bind:user="user" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    import { User } from "../types";

    import EditPassword from '../components/Account/EditPassword.vue';
    import DeleteAccount from '../components/Account/DeleteAccount.vue';
    import EditEmailAddress from '../components/Account/EditEmailAddress.vue';
    import EditUsername from '../components/Account/EditUsername.vue';
    import store from '../store/index';

    @Component({
      components: { EditUsername, EditEmailAddress, EditPassword, DeleteAccount }
    })
    export default class Main extends Vue {
        user: User = {
            username: this.$store.state.user.username,
            email: this.$store.state.user.email,
        }
    }
</script>
