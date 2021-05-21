<template>
    <div>
        <h1>Connexion</h1>

        <form>
            <label>
                Email
                <input type="text" v-model='user.email' />
            </label>
            <label>
                Mot de passe
                <input type="password" v-model='user.password'>
            </label>
            <button type="button" v-on:click="login">Connexion</button>
            <p v-if="error">{{ error }}</p>
            <p v-if="success">{{ success }}</p>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { User } from "../types";
    import { loginUser } from "../helpers/user-getter";

    @Component
    export default class EditPassword extends Vue {
        user: User = {
            email: '',
            password: '',
        }

        error = '';
        success = '';

        login() {
            loginUser(this.user)
                .then((user) => {
                    this.user.email = '';
                    this.user.password = '';
                    this.success = 'Logged in !';
                })
                .catch((err) => {
                    this.error = err.message;
                })
        }
    }
</script>
