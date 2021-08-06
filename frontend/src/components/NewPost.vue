<template>
  <form
    class="post_new"
    @submit.prevent="sendPost"
    enctype="multipart/form-data"
  >
    <label
      class="post_new--label post_title--label"
      for="Titre de la publication"
      >Titre de votre publication</label
    >
    <textarea
      class="post_new--textarea post_title--textarea"
      aria-label="Titre"
      placeholder="Titre"
      id="postTitre"
      v-model="titre"
    ></textarea>

    <label class="post_new--label post_content--label" for="Quoi de neuf ?"
      >Quoi de neuf ?</label
    >
    <textarea
      class="post_new--textarea post_content--textarea"
      aria-label="Quoi de neuf?"
      placeholder="Quoi de neuf?"
      id="postContent"
      v-model="content"
    ></textarea>

    <input
      class="post_new--file"
      aria-label="Choisir un fichier"
      type="file"
      accept="image/*"
      ref="file"
      @change="selectFile"
    />

    <button class="post_new--btn" type="submit">
      <font-awesome-icon icon="paper-plane"></font-awesome-icon>
      Publier
    </button>
  </form>
</template>

<script>
import ApiService from "../api-service";

export default {
  name: "NewPost",
  data() {
    return {
      titre: null,
      content: null,
      file: "",
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    // Ajout d'une image
    selectFile() {
      this.file = this.$refs.file.files[0];
    },

    // Création d'un nouveau Post
    sendPost(e) {
      let formData = new FormData(); // Création de paires clés/valeurs
      formData.append("titre", this.titre);
      formData.append("content", this.content);
      formData.append("file", this.file);
      formData.append("user_id", this.userId);
      // Si il y a un titre & un contenu:
      if (this.titre && this.content) {
        // Envoie des informations grâce à Axios
        ApiService.createPost(formData).then(() => {
          alert("Post envoyé avec succès !");
          document.location.reload(); // Rechargement de la page
        });
      } else {
        // Sinon un message d'alerte est envoyé
        alert("Titre ou message non remplit !");
      }
      e.preventDefault();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post_new {
  display: flex;
  flex-direction: column;
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 10px 10px #e2e2e2;
  max-width: 600px;

  .post_content--textarea {
    height: 75px;
  }

  &--label {
    margin-top: 1rem;
  }

  &--textarea {
    resize: none;
    margin-top: 0.5rem;
  }

  &--file {
    margin-top: 1rem;
  }

  &--btn {
    width: 80px;
    align-self: flex-end;
    margin-top: 0.5rem;
    background-color: #fd2d02;
    color: #fff;
    border-radius: 10px;
    border: none;
    padding: 0.5rem;
    box-shadow: 2px 3px 10px #e2e2e2;
    font-weight: bold;
    transition: all 300ms ease-in-out;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 10px #808080;
      cursor: pointer;
    }
  }
}
</style>
