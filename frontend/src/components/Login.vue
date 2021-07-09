<template>
        <section id="login" class="login">
            <h2>Connexion</h2>
            <form class="login_form" method="POST">
                <div class="login_form--username">
                    <label class="login_form--username-label" for="username">Nom d'utilisateur</label>
                    <input class="login_form--username-input" type="text">
                </div>

                <div class="login_form--password">
                    <label class="login_form--password-label" for="password">Mot de Passe</label>
                    <input class="login_form--password-input" type="password">
                </div>

                <button class="login_form--btn" type="submit">Connexion</button>
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
