<template>
    <div>
        <h1>Créer un compte</h1>

        <form>
            <label>
                Identifiant
                <input type="text" v-model='user.username' />
            </label>
            <label>
                Adresse email
                <input type="text" v-model='user.email' />
            </label>
            <label>
                Mot de passe
                <input type="password" v-model='user.password'>
            </label>
            <button type="button" v-on:click="createNewUser" class="button">Inscription</button>
            <p v-if="error">{{ error }}</p>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { RegistrationInformation, User } from "../types";
    import { postNewUser } from "../helpers/user-getter";
    import router from "../router";

    @Component
    export default class EditPassword extends Vue {
        user: RegistrationInformation = {
            email: '',
            username: '',
            password: '',
        }

        error = '';

        createNewUser() {
            postNewUser(this.user)
                .then((response) => {
                    this.user.email = '';
                    this.user.username = '';
                    this.user.password = '';

                    this.error = '';

                    sessionStorage.setItem("token", response.token);
                    this.$store.dispatch('setUser', response.user);
                    router.replace("/");
                })
                .catch((err) => {
                    this.error = err.message;
                })
        }
    }
</script>
