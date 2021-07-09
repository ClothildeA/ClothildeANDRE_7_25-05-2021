<template>
        <section id="signup" class="signup">
            <h2>Inscription</h2>
            <form class="signup_form" method="POST">

                <div class="signup_form--username">
                    <label class="signup_form--username-label" for="username">Nom d'utilisateur</label>
                    <input class="signup_form--username-input" type="text">
                </div>

                <div class="signup_form--password">
                    <label class="signup_form--password-label" for="password">Mot de Passe</label>
                    <input class="signup_form--password-input" type="password">
                </div>

                <div class="signup_form--email">
                    <label class="signup_form--email-label" for="email">Email</label>
                    <input class="signup_form--email-input" type="email">
                </div>

                <div class="signup_form--nom">
                    <label class="signup_form--nom-label" for="nom">Nom</label>
                    <input class="signup_form--nom-input" type="text">
                </div>

                <div class="signup_form--prenom">
                    <label class="signup_form--prenom-label" for="prenom">Prénom</label>
                    <input class="signup_form--prenom-input" type="text">
                </div>

                <div class="signup_form--admin">
                    <input class="signup_form--admin-input" type="checkbox">
                    <label class="signup_form--admin-label" for="admin">Je suis admin</label>
                </div>

                <button class="signup_form--btn" type="submit">S'inscrire</button>
            </form>
        </section>
</template>

<script>

import  ApiService from '../api-service';

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
