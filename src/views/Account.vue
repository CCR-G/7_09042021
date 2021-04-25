<template>
    <div>
        <h1>Votre compte</h1>

        <form>
            <label>
                Nom d'utilisateur
                <input type="text" value="David Michel">
            </label>
            <button type="submit">Modifier</button>
        </form>

        <form>
            <label>
                Adresse e-mail
                <input type="email" value="david.michel@gmail.com">
            </label>
            <button type="submit">Modifier</button>
        </form>

        <button type="button">Modifier le mot de passe</button>
        <p>Le mot de passe a été modifié avec succès</p>
        <form>
            <label>
                Mot de passe actuel
                <input type="password">
            </label>
            <label>
                Nouveau mot de passe
                <input type="password">
            </label>
            <button type="submit">Modifier</button>
        </form>

        <button type="button">Supprimer le compte</button>
        <form>
            <label>
                Entrez votre mot de passe
                <input type="password">
            </label>
            <button type="submit">Supprimer</button>
        </form>
    </div>
</template>
