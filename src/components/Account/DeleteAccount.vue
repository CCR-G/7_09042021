<template>
    <section>
        <button type="button" v-if="!is_deleting" v-on:click="toggleDeletingForm">Supprimer le compte</button>

        <form v-else>
            <label>
                Entrez votre mot de passe :
                <input type="password">
            </label>
            <button type="submit">Confirmer la suppression du compte</button>
            <button type="reset" v-on:click="toggleDeletingForm">Annuler</button>
        </form>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class DeleteAccount extends Vue {
        is_deleting = false;

        toggleDeletingForm(): void {
            this.is_deleting = !this.is_deleting;
        }
    }
</script>
