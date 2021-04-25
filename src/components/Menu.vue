<template>
    <div>
        <nav>
            <ul>
                <!-- This will be filled with menu items (Signup ou login | account, logout, new post(goes back top)) -->
                <li>
                    <router-link to="/">Home</router-link>
                    <router-link to="/account">Account</router-link>
                    <router-link to="/signup">Signup</router-link>
                    <router-link to="/login">Login</router-link>
                    <router-link to="/login">Logout</router-link>
                </li>
            </ul>
        </nav>



        <button class="hamburger"><i aria-hidden="true"></i></button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Menu extends Vue {
    }
</script>
