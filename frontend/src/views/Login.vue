<template>
    <div>
        <h1>{{ loginType }}</h1>

        <form>
            <label>
                Identifiant
                <input type="text" v-model='user.email' />
            </label>
            <label v-if="!has_account">
                Adresse email
                <input type="text" v-model='user.name' />
            </label>
            <label>
                Mot de passe
                <input type="password" v-model='user.password'>
            </label>
            <button type="submit">Connexion</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
import { User } from "../types";

    @Component
    export default class EditPassword extends Vue {
        has_account = true;
        user: User = {
            email: '',
            name: '',
            password: '',
        }

        get loginType(): string {
            return this.has_account ? "Login" : "Signup";
        }

        get loginAction(): string {
            return this.has_account ? "Connexion" : "Inscription";
        }
    }
</script>
