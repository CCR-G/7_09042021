<template>
    <section>
        <button type="button" v-if="!is_deleting" v-on:click="toggleDeletingForm">Supprimer le compte</button>

        <form v-else>
            <label>
                Entrez votre mot de passe :
                <input type="password" v-model="password">
            </label>
            <button type="button" v-on:click="deleteAccount">Confirmer la suppression du compte</button>
            <button type="reset" v-on:click="toggleDeletingForm">Annuler</button>
        </form>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { deleteUser } from "../../helpers/user-getter";

    @Component
    export default class DeleteAccount extends Vue {
        is_deleting = false;
        private password = '';
        private error = '';

        toggleDeletingForm(): void {
            this.is_deleting = !this.is_deleting;
        }

        deleteAccount(): void {
            deleteUser(this.$store.state.user.id, this.password)
                .then((res) => {
                    this.password = '';
                    this.error = '';

                    sessionStorage.removeItem("token");
                    this.$router.replace("/register");
                    this.$store.dispatch('setUser', { username: '', email: '' });
                })
                .catch((err) => {
                    this.error = err.message;
                });
        }
    }
</script>
