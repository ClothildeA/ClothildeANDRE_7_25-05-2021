<template>
    <section class="post">
            <!--AFFICHAGE DES POSTS-->
        <form class="post_new" method="POST">
            <label class="post_new--label post_title--label" for="Titre de la publication">Titre de votre publication</label>
            <textarea class="post_new--textarea post_title--textarea" aria-label="Titre" placeholder="Titre"></textarea>
            <label class="post_new--label post_content--label" for="Quoi de neuf ?">Quoi de neuf Username ?<!--{{ post.username }}--></label>
            <textarea class="post_new--textarea post_content--textarea" aria-label="Quoi de neuf?" placeholder="Quoi de neuf?"></textarea>
            <button class="post_new--btn" type="submit">Publier</button>
        </form>

        <h2 class="post_actu">Fil d'actualités</h2>

        <div class="post_item" v-for="post in posts" :key="post.id">
            <div class="post_item--content">
                
                <div class="post_header">
                    <h3 class="post_header--username">{{ post.author.username }}</h3>
                        <div class="post_header--date">
                        <div class="post_header--date-logo"> <!-- clock icon --> </div>
                        <p class="post_header--date-content date">{{ moment(post.date).fromNow() }}</p>
                    </div>
                </div>

                <h4 class="post_item--content-title">{{ post.titre }}</h4>
                    <img class="post_item--content-img"
                     v-if="post.imageUrl != ''"
                     :src="post.imageUrl"
                     :alt="post.titre"/>
                <p class="post_item--content-txt">{{ post.content }}</p>

                        <div class="comments_wrapper">
                        <h5 class="comments_wrapper--title" v-if="post.comments.length >= 0" @click="showCommentsAction(post)">Commentaires - {{ post.comments.length }}</h5>
                        <div class="comment_item">
                                <div class="comment_header">
                                    <h6 class="comment_header--username">Username<!--{{ comment.username }}--></h6>
                                    <div class="comment_header--date">
                                        <div class="comment_header--date-logo"> <!-- clock icon --> </div>
                                        <p class="date">Il y a 45 minutes<!--{{ moment(comment.date).fromNow() }}--> </p>
                                    </div>
                                </div>
                                <p class="comment_content">
                                    <!--{{ comment.message }}-->
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                </p>

                        </div>
                        <form class="comment_new" method="POST">
                            <textarea class="comment_new--textarea" aria-label="Ajouter un commentaire..." placeholder="Ajouter un commentaire..."></textarea>
                            <button class="comment_new--btn" type="submit">Publier</button>
                        </form>
                    </div>
                
            </div>
        </div>
    </section>
</template>

<script>

import  ApiService from '../api-service';

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {
    name: "Post",
    data() {
        return {
        error: [],
        userId: localStorage.getItem('userId'),
        isAdmin: localStorage.getItem('isAdmin'),
        moment: moment,
        posts : [],
        comments : {},
        showComments : {},
        message:  "",
        }
    },
    methods: {
        // Suppression d'un post
          removePost(post) {
              
            if ( confirm("Êtes vous sûr de vouloir supprimer le post ?") ) {
                ApiService.removePost(post)
                location.reload()
            } else {
               return;
            }
        },
        // Affichage des commentaires liés au post
        showCommentsAction(post) {
            this.showComments[post.post_id] = !this.showComments[post.post_id]
            this.showComments = JSON.parse(JSON.stringify(this.showComments))
        },
        sendComment(postId) {
            const message =  this.message;
            console.log(message);
            console.log(postId);
            ApiService.createComment(message, postId)
            this.message = "";
            location.reload()
        },
        removeComment(comment) {
            if ( confirm("Êtes vous sûr de vouloir supprimer le commentaire ?") ) {
                ApiService.removeComment(comment)
                location.reload()
            } else {
               return;
            }
        },
    },
    mounted() {
        //Appel à API pour affichage de tous les messages
      ApiService.getAllPost() 
      .then(response => {
        this.posts = response.data;
        console.log(this.posts);
      })
      .catch(error => console.log(error));
      ApiService.getAllComment()
      .then(response => {
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch(error => console.log(error));
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date {
    font-size: .7rem;
    color: #808080;
}

.post {

    &_new {
        display: flex;
        flex-direction: column;
        margin: 1.5rem 1rem;
        padding: 1.5rem;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0px 10px 10px #E2E2E2;

        .post_content--textarea {
            height: 75px;
        }

        &--label {
            margin-top: 1rem;
        }

        &--textarea {
            resize: none;
            margin-top: .5rem;
        }

        &--btn {
            width: 60px;
            align-self: flex-end;
            margin-top: .5rem;
        }
    }

    &_actu {
        margin: 1rem;
        font-size: 1.3rem;

        &::before {
            font-family: "Font Awesome 5 Free"; 
            font-weight: 400; 
            content: "\f017";
            padding-right: 1rem;
        }
    }
    .post_item {
        border-radius: 5px;
        background-color: #fff;
        margin: 1rem;
        padding: 1rem;
        border: 1px solid #E2E2E2;

        .post_header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            border-bottom: 1px solid #e2e2e2;

            &--username {
                font-size: 1rem;
            }
        }

        &--content-txt {
            text-align: justify;
            padding: 1rem .2rem;
        }
    }
}

.comments_wrapper {
    padding: .9rem;
    margin: 1rem 0;
    border-top: 1px solid #e2e2e2;

    &--title {
        margin: 0;
        padding: 1rem 0;
        font-size: 1rem;
    }

    .comment_item {
        margin: 1rem 0;
        padding: 0.5rem;
        border-bottom: .5px solid #e2e2e2;

        .comment_header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;

            &--username {
                font-size: 1rem;
            }
        }

        .comment_content {
            text-align: justify;
        }
    }
    .comment_new {
        display: flex;
        justify-content: space-between;
        border: 1px solid #E2E2E2;
        border-radius: 5px;
        &--textarea {
            resize: none;
            border: none;
            width: 100%;
            &:focus-visible{
                outline: none;
            }
        }
        &--btn {
            border: none;
            background: none;
            color: #fd2d02;
            font-weight: bold;
        }
    }
}
</style>
