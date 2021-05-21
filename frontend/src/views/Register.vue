<template>
    <div>
        <h1>Créer un compte</h1>

        <form>
            <label>
                Identifiant
                <input type="text" v-model='user.name' />
            </label>
            <label>
                Adresse email
                <input type="text" v-model='user.email' />
            </label>
            <label>
                Mot de passe
                <input type="password" v-model='user.password'>
            </label>
            <button type="button" v-on:click="createNewUser">Inscription</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { User } from "../types";
    import { postNewUser } from "../helpers/user-getter";

    @Component
    export default class EditPassword extends Vue {
        user: User = {
            email: '',
            name: '',
            password: '',
        }

        createNewUser() {
            postNewUser(this.user).then(() => {
                this.user.email = '';
                this.user.name = '';
                this.user.password = '';
            });
        }
    }
</script>
