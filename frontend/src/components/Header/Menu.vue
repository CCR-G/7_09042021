<template>
    <div>
        <nav v-if="isLoggedIn">
            <ul>
                <!-- This will be filled with menu items (Signup ou login | account, logout, new post(goes back top)) -->
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/account">Account</router-link></li>
                <li><button type="button" v-on:click="logout">Logout</button></li>
            </ul>
        </nav>
        <nav v-else>
            <router-link v-if="currentRoute !== '/register'" to="/register">Register</router-link>
            <router-link v-if="currentRoute !== '/login'" to="/login">Login</router-link>
        </nav>
    </div>
</template>

<script lang="ts">
    import { Prop, Component, Vue } from "vue-property-decorator";
    import router from '../../router/index';
    import { clearSession } from '../../helpers/clear-session';

    @Component
    export default class Menu extends Vue {
        get currentRoute() {
            return this.$route.path;
        }

        get isLoggedIn() {
            return !!this.$store.state.user.id;
        }

        logout():void {
            clearSession();
        }
    }
</script>
