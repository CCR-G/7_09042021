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

    @Component({
      components: { EditUsername, EditEmailAddress, EditPassword, DeleteAccount }
    })
    export default class Main extends Vue {
        user: User = {
            name: "Alasdair Fraser",
            email: "alasdair@gaelic-music.com",
            password: "azerty"
        }
    }
</script>
