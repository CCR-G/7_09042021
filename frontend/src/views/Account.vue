<template>
    <div>
        <h1>Votre compte</h1>
        <!--<EditUsername v-bind:user="user" />
        <EditEmailAddress v-bind:user="user" />
        <EditPassword v-bind:user="user" />-->
        <button type="button" v-on:click="logout" class="button account-button">Fermer la session</button>
        <DeleteAccount />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    //import { User } from "../types";
    import { clearSession } from '../helpers/clear-session';

    import EditPassword from '../components/Account/EditPassword.vue';
    import DeleteAccount from '../components/Account/DeleteAccount.vue';
    import EditEmailAddress from '../components/Account/EditEmailAddress.vue';
    import EditUsername from '../components/Account/EditUsername.vue';

    @Component({
      components: { EditUsername, EditEmailAddress, EditPassword, DeleteAccount }
    })
    export default class Main extends Vue {
        /*user: User = {
            id: this.$store.state.user.id,
            username: this.$store.state.user.username,
            email: this.$store.state.user.email,
            admin: this.$store.state.user.admin
        }*/

        logout():void {
            clearSession();
            this.$router.replace("/login");
        }
    }
</script>
