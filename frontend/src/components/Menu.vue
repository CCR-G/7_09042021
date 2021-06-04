<template>
    <div>
        <nav>
            <ul v-if="isLoggedIn">
                <!-- This will be filled with menu items (Signup ou login | account, logout, new post(goes back top)) -->
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/account">Account</router-link></li>
                <li><button type="button" v-on:click="logout">Logout</button></li>
            </ul>
            <ul v-else>
                <li><router-link to="/register">Register</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
    import { Prop, Component, Vue } from "vue-property-decorator";
    import router from '../router/index';
    import { clearSession } from '../helpers/clear-session';

    @Component
    export default class Menu extends Vue {
        @Prop() private isLoggedIn!: boolean;

        logout():void {
            clearSession();
        }
    }
</script>
