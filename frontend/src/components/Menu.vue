<template>
    <div>
        <nav>
            <ul>
                <!-- This will be filled with menu items (Signup ou login | account, logout, new post(goes back top)) -->
                <li>
                    <router-link to="/">Home</router-link>
                    <router-link to="/account">Account</router-link>
                    <router-link to="/register">Register</router-link>
                    <router-link to="/login">Login</router-link>
                    <button type="button" v-on:click="logout">Logout</button>
                </li>
            </ul>
        </nav>

        <button class="hamburger"><i aria-hidden="true"></i></button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import router from '../router/index';

    @Component
    export default class Menu extends Vue {
        logout():void {
            sessionStorage.removeItem("token");
            if ((this.$route.path !== "/login") && (this.$route.path !== "/register")) {
                router.replace("/login");
            }
            this.$store.dispatch('setUser', { username: '', email: '' });
        }
    }
</script>
