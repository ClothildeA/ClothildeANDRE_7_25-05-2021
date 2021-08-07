<template>
  <section class="post">
    <!--AFFICHAGE DES POSTS-->
    <div class="post_title">
      <font-awesome-icon icon="newspaper" class="post_title--icon" />
      <h2 class="post_title--text">Fil d'actualités</h2>
    </div>

    <div class="post_item" v-for="post in posts" :key="post.id">
      <div class="post_item--content">
        <div class="post_header">
          <font-awesome-icon icon="user" class="post_header--icon" />
          <h3 class="post_header--username">{{ post.author.username }}</h3>
          <div class="post_header--date">
            <div class="post_header--date-logo">
              <font-awesome-icon icon="history" />
            </div>
            <p class="post_header--date-content date">
              {{ moment(post.date).fromNow() }}
            </p>
          </div>

          <button
            type="button"
            title="Supprimer cette publication"
            class="post_header--btn"
            v-if="post.user_id == userId || isAdmin == 'ADMIN'"
            @click="removePost(post)"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>

        <h4 class="post_item--content-title">{{ post.titre }}</h4>
        <img
          class="post_item--content-img"
          v-if="post.imageUrl != ''"
          :src="post.imageUrl"
          :alt="post.titre"
        />
        <p class="post_item--content-txt">{{ post.content }}</p>
        <button
          class="post_item--content-btn"
          v-if="post.comments.length >= 1"
          @click="showCommentsAction(post)"
        >
          <font-awesome-icon icon="comment" />
          Commentaires - {{ post.comments.length }}
        </button>
        <div class="comments_wrapper" v-if="showComments[post.post_id]">
          <div
            class="comments_wrapper--items"
            v-for="comment in comments"
            :key="comment.postId"
          >
            <div class="comment_item" v-if="post.post_id == comment.post_id">
              <div class="comment">
                <div class="comment_header">
                  <h6 class="comment_header--username">
                    {{ comment.username }}
                  </h6>
                  <div class="comment_header--date">
                    <p class="date">{{ moment(comment.date).fromNow() }}</p>
                  </div>
                  <button
                    type="button"
                    title="Supprimer ce commentaire"
                    class="comment_header--remove-btn"
                    v-if="comment.user_id == userId || isAdmin == 'ADMIN'"
                    @click="removeComment(comment)"
                  >
                    <font-awesome-icon icon="trash-alt" />
                  </button>
                </div>
                <p class="comment_content">{{ comment.message }}</p>
              </div>
            </div>
          </div>
        </div>
        <form class="comment_new" @submit.prevent="sendComment(post.post_id)">
          <input
            type="text"
            class="comment_new--textarea"
            aria-label="Ajouter un commentaire..."
            placeholder="Ajouter un commentaire..."
            v-model.lazy="message"
          />
          <button class="comment_new--btn" type="submit">
            <font-awesome-icon icon="paper-plane" />
            Publier
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import ApiService from "../api-service";

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {
  name: "Post",
  data() {
    return {
      error: [],
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
      moment: moment,
      posts: [],
      comments: {},
      showComments: {},
      message: "",
    };
  },
  methods: {
    // Suppression d'un post
    removePost(post) {
      if (confirm("Êtes vous sûr de vouloir supprimer le post ?")) {
        ApiService.removePost(post);
        location.reload();
      } else {
        return;
      }
    },

    // Affichage des commentaires liés au post
    showCommentsAction(post) {
      this.showComments[post.post_id] = !this.showComments[post.post_id];
      this.showComments = JSON.parse(JSON.stringify(this.showComments));
    },

    // Création d'un nouveau commentaire
    sendComment(postId) {
      const message = this.message;
      ApiService.createComment(message, postId);
      this.message = "";
      location.reload();
    },

    // Suppression d'un commentaire
    removeComment(comment) {
      if (confirm("Êtes vous sûr de vouloir supprimer le commentaire ?")) {
        ApiService.removeComment(comment);
        location.reload();
      } else {
        return;
      }
    },
  },

  mounted() {
    //Appel de l'API pour l'affichage de tous les posts et commentaires
    ApiService.getAllPost()
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => console.log(error));
    ApiService.getAllComment()
      .then((response) => {
        this.comments = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang="scss">
.date {
  font-size: 0.7rem;
  color: #808080;
  margin: 1rem 1rem 1rem 0.5rem;
}

.post {
  max-width: 600px;
  margin: auto;

  &_title {
    display: flex;
    align-items: baseline;
    margin: 1rem;
    font-size: 0.9rem;

    &--icon {
      font-size: 1.1rem;
      margin: 0.5rem;
      color: #fd2d02;
    }
  }

  .post_item {
    border-radius: 5px;
    background-color: #fff;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #e2e2e2;

    .post_header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e2e2;

      &--icon {
        margin: 0.5rem;
        color: #808080;
      }

      &--date {
        display: flex;
        align-items: baseline;

        &-logo {
          color: #808080;
          font-size: 0.7rem;
        }
      }

      &--username {
        font-size: 1rem;
        flex-grow: 1;
      }

      &--btn {
        background: none;
        border: none;
        color: #fd2d02;
        font-weight: bold;
        transition: all 300ms ease-in-out;

        &:hover {
          opacity: 0.6;
          cursor: pointer;
        }
      }
    }

    &--content-img {
      max-width: 100%;
    }

    &--content-txt {
      text-align: justify;
      padding: 1rem 0.2rem;
    }

    &--content-btn {
      background: none;
      border: none;
      color: #fd2d02;
      font-weight: bold;
      margin: 1rem 0;
      transition: all 300ms ease-in-out;

      &:hover {
        opacity: 0.6;
        cursor: pointer;
      }
    }
  }
}

.comments_wrapper {
  padding: 0.9rem;

  &--title {
    margin: 0;
    padding: 1rem 0;
    font-size: 1rem;
  }

  .comment_item {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-top: 0.5px solid #e2e2e2;

    .comment_header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      &--username {
        font-size: 0.9rem;
        flex-grow: 1;
        margin: 1rem 0;
      }

      &--edit-btn {
        background: none;
        border: none;
        color: #545454;
        font-weight: bold;
        transition: all 300ms ease-in-out;

        &:hover {
          opacity: 0.6;
          cursor: pointer;
        }
      }

      &--remove-btn {
        background: none;
        border: none;
        color: #fd2d02;
        font-weight: bold;
        transition: all 300ms ease-in-out;

        &:hover {
          opacity: 0.6;
          cursor: pointer;
        }
      }
    }

    .comment_content {
      text-align: justify;
      font-size: 0.9rem;
    }
  }
}
.comment_new {
  display: flex;
  justify-content: space-between;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  margin: 1rem;

  &--textarea {
    resize: none;
    border: none;
    width: 100%;
    padding: 0.5rem;

    &:focus-visible {
      outline: none;
    }
  }
  &--btn {
    border: none;
    background: none;
    color: #fd2d02;
    font-weight: bold;
    width: 110px;
    transition: all 300ms ease-in-out;

    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
  }
}
</style>
