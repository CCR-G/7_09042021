<template>
    <div>
        <h1>Login</h1>
        <form>
            <label>
                Identifiant
                <input type="text" v-model='username' />
            </label>
            <label>
                Mot de passe
                <input type="password">
            </label>
            <button type="submit">Connexion</button>
        </form>
    </div>
</template>
