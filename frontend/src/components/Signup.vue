<template>
  <div id="signup" class="signup">
    <h2>Inscription</h2>
    <form class="signup_form" @submit.prevent="submitForm">
      <div class="signup_form--item">
        <input
          class="signup_form--item-input"
          placeholder="Nom d'utilisateur"
          type="text"
          id="username"
          aria-label="Nom d'utilisateur"
          v-model="username"
        />

        <input
          class="signup_form--item-input"
          placeholder="Mot de passe"
          type="password"
          id="password"
          aria-label="Mot de passe"
          v-model="password"
        />
      </div>

      <div class="signup_form--item">
        <input
          class="signup_form--item-input"
          placeholder="Nom"
          type="text"
          id="nom"
          aria-label="Nom"
          v-model="nom"
        />

        <input
          class="signup_form--item-input"
          placeholder="Prénom"
          type="text"
          id="prenom"
          aria-label="Prénom"
          v-model="prenom"
        />
      </div>

      <div class="signup_form--item">
        <input
          class="signup_form--email-input"
          placeholder="Email"
          type="email"
          id="email"
          aria-label="Email"
          v-model="email"
        />
      </div>

      <button class="signup_form--btn" type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import ApiService from "../api-service";
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
    };
  },
  methods: {
    submitForm(e) {
      this.errors = [];
      if (!this.nom) {
        this.errors.push("Nom requis !");
      }
      if (!this.prenom) {
        this.errors.push("Prenom requis !");
      }
      if (!this.username) {
        this.errors.push("Pseudo requis !");
      }
      if (!this.email) {
        this.errors.push("Email requis !");
      }
      if (!this.password) {
        this.errors.push("Mot de passe requis");
      }
      if (!this.errors.length) {
        ApiService.signup(
          this.nom,
          this.prenom,
          this.username,
          this.email,
          this.password
        ).then(() => {
          alert("Bienvenue ! vous pouvez maintenant vous connecter !");

          this.$router.push("/login");
        });
      }

      e.preventDefault();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  text-align: center;
}
.signup_form {
  display: flex;
  flex-direction: column;

  &--item {
    display: flex;
    justify-content: space-between;
    margin: 0.9rem;

    &-label {
      margin-right: 1rem;
    }
  }
  &--btn {
    max-width: fit-content;
    align-self: center;
    margin: 1.5rem;
    background-color: #fd2d02;
    color: #fff;
    border-radius: 10px;
    border: none;
    padding: 0.5rem;
    box-shadow: 2px 3px 10px #e2e2e2;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 10px #808080;
    }
  }
}
</style>
