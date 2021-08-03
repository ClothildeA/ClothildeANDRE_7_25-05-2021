<template>
  <header id="header" class="header">
    <nav class="header_nav">
      <img
        class="nav_logo"
        src="../assets/icon-left-font-monochrome-black.png"
        alt="groupomania logo"
        v-if="!currentUser"
      />

      <router-link to="/post" class="nav_link">
        <img
          class="header_logo--connected"
          src="../assets/icon.png"
          alt="groupomania logo"
          v-if="currentUser"
        />
      </router-link>

      <router-link class="nav_link" to="/post">
        <div v-if="currentUser" class="hover">
          <font-awesome-icon icon="home" class="link-icon" />
          <a class="link-text">Accueil</a>
        </div>
      </router-link>

      <router-link class="nav_link" to="/profil">
        <div v-if="currentUser" class="hover">
          <font-awesome-icon icon="user-circle" class="link-icon" />
          <a class="link-text">Mon Profil</a>
        </div>
      </router-link>

      <div v-if="currentUser" class="hover nav_link disconnect">
        <font-awesome-icon icon="sign-out-alt" class="link-icon" />
        <a class="link-text" @click.prevent="disconnect">Déconnexion</a>
      </div>
    </nav>

    <h1 class="header_title" v-if="!currentUser">
      Avec Groupomania,<br />partagez et communiquez avec vos collaborateurs.
    </h1>
    <h1 class="header_title title-connected" v-if="currentUser">
      Bonjour {{ username }} !
    </h1>
  </header>
</template>

<script>
export default {
  name: "NavLink",
  data() {
    return {
      currentUser: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      nom: localStorage.getItem("nom"),
      prenom: localStorage.getItem("prenom"),
    };
  },

  methods: {
    disconnect() {
      localStorage.clear();
      console.log("Déconnexion");
      setTimeout(() => {
        this.$router.push("/");
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background-color: #fff;
  box-shadow: 0 0px 10px #e2e2e2;

  .nav_logo {
    width: 90%;
    padding: 0.5rem 1rem;
  }

  &_logo--connected {
    width: 50%;
  }

  &_title {
    font-size: 1.5rem;
    padding: 0 1rem 1.5rem;
    font-weight: 100;
    margin: 0;
  }
  .title-connected {
    text-align: center;
  }

  &_nav {
    display: flex;
    align-items: center;
    flex-basis: 100%;
    justify-content: space-between;
    padding: 0 1rem 1rem;
    max-width: 600px;
    margin: auto;

    .nav_link {
      flex-basis: 20%;
      font-size: 0.9rem;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      text-align: center;
      font-weight: bold;
    }
    .hover {
      padding: 1.5rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 2;

      &:hover {
        border-top: 2px solid #fd2d02;
        color: #fd2d02;
      }

      .link-icon {
        margin: 0.5rem;
        font-size: 1.1rem;
      }

      .link-text {
        display: none;
      }
    }

    .disconnect {
      color: #fd2d02;
    }
  }
}

@media all and (min-width: 765px) {
  .header {
    &_nav {
      .nav_logo {
        width: 65%;
      }
      .nav_link {
        .hover {
          .link-text {
            display: block;
          }
        }
        .link-text {
          display: block;
        }
      }
    }

    &_title {
      padding: 0 2.5rem 1.5rem;
    }
  }
}
</style>
