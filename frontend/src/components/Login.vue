<template>
  <section id="login" class="login">
    <h2>Connexion</h2>
    <form id="login-form" class="login_form" @submit="loginForm">
      <div class="login_form--item">
        <label class="login_form--item-label" for="username"
          >Nom d'utilisateur</label
        >
        <input
          class="login_form--item-input"
          type="text"
          id="username"
          v-model="username"
        />
      </div>

      <div class="login_form--item">
        <label class="login_form--item-label" for="password"
          >Mot de Passe</label
        >
        <input
          class="login_form--item-input"
          type="password"
          id="password"
          v-model="password"
        />
      </div>

      <button class="login_form--btn" type="submit">Connexion</button>
    </form>
  </section>
</template>

<script>
import ApiService from "../api-service";

export default {
  name: "login",
  data() {
    return {
      errors: [],
      username: null,
      password: null,
      data: JSON.parse(localStorage.getItem("user")),
      user: "",
    };
  },

  methods: {
    loginForm(e) {
      this.errors = [];
      if (!this.username) {
        this.errors.push("Pseudo requis !");
      }
      if (!this.password) {
        this.errors.push("Mot de passe requis");
      }
      if (!this.errors.length) {
        ApiService.login(this.username, this.password).then((result) => {
          localStorage.setItem("userId", result.data.userId);
          localStorage.setItem("token", result.data.token);
          alert("Vous êtes à présent connecté !");
          let userId = localStorage.getItem("userId");
          ApiService.getOneUser(userId)

            .then((response) => {
              this.user = response.data;
              this.username = localStorage.setItem(
                "username",
                this.user.username
              );
              this.nom = localStorage.setItem("nom", this.user.nom);
              this.prenom = localStorage.setItem("prenom", this.user.prenom);
              this.isAdmin = localStorage.setItem("isAdmin", this.user.isAdmin);
              this.$router.push("/post");
            })
            .catch((error) => console.log(error));
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
.login_form {
  display: flex;
  flex-direction: column;

  &--item {
    display: flex;
    justify-content: center;
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
    transition: all 300ms ease-in-out;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 10px #808080;
      cursor: pointer;
    }
  }
}
</style>
