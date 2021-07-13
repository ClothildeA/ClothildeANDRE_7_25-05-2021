<template>
        <section id="signup" class="signup">
            <h2>Inscription</h2>
            <form class="signup_form" @submit.prevent="submitForm">

                <div class="signup_form--username">
                    <label class="signup_form--username-label" for="username">Nom d'utilisateur</label>
                    <input class="signup_form--username-input"
                    type="text"
                    id="username"
                    v-model="username">
                </div>

                <div class="signup_form--password">
                    <label class="signup_form--password-label" for="password">Mot de Passe</label>
                    <input class="signup_form--password-input"
                    type="password"
                    id="password"
                    v-model="password">
                </div>

                <div class="signup_form--email">
                    <label class="signup_form--email-label" for="email">Email</label>
                    <input class="signup_form--email-input"
                    type="email"
                    id="email"
                    v-model="email">
                </div>

                <div class="signup_form--nom">
                    <label class="signup_form--nom-label" for="nom">Nom</label>
                    <input class="signup_form--nom-input"
                    type="text"
                    id="nom"
                    v-model="nom">
                </div>

                <div class="signup_form--prenom">
                    <label class="signup_form--prenom-label" for="prenom">Prénom</label>
                    <input class="signup_form--prenom-input"
                    type="text"
                    id="prenom"
                    v-model="prenom">
                </div>

                <div class="signup_form--admin">
                    <input class="signup_form--admin-input"
                    type="checkbox"
                    id="isAdmin"
                    v-model="isAdmin">
                    <label class="signup_form--admin-label" for="admin">Je suis admin</label>
                </div>

                <button class="signup_form--btn" type="submit">S'inscrire</button>
            </form>
        </section>
</template>

<script>
import ApiService from '../api-service';
export default {
    name: "signup",
    data() {
      return {
        errors: [],
        nom: null,
        prenom: null,
        username: null,
        email: null,
        password: null,
        isAdmin: null
      }
    },
    methods: {
     
      submitForm(e) {
        this.errors = [];
        if (!this.nom) {
          this.errors.push('Nom requis !');
        }
        if (!this.prenom) {
          this.errors.push('Prenom requis !');
        }
        if (!this.username) {
          this.errors.push('Pseudo requis !');
        }
        if (!this.email) {
          this.errors.push("Email requis !");
        }
        if (!this.password) {
          this.errors.push('Mot de passe requis');
        }
        if (!this.errors.length) {
        ApiService.signup(this.nom, this.prenom, this.username, this.email, this.password, this.isAdmin)
         .then(() => {
         alert("Bienvenue ! vous pouvez maintenant vous connecter !")
         
          this.$router.push('/login');
         })
        }
         
         e.preventDefault();
      },
        
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
