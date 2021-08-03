<template>
  <section id="profil" class="profil">

    <h1 class="profil_title">Mon profil</h1>

    <div class="profil_wrapper">
        <p class="profil_wrapper--content">
            <strong>Nom d'utilisateur:</strong><br>
            {{user.username}}
        </p>

        <p class="profil_wrapper--content">
            <strong>Nom :</strong><br>
            {{user.nom}}
        </p>

        <p class="profil_wrapper--content">
            <strong>Prénom :</strong><br>
            {{user.prenom}}
        </p>

        <p class="profil_wrapper--content">
            <strong>Email :</strong><br>
            {{user.email}}
        </p>
    </div>

    <button class="profil_del-btn" @click="deleteOneUser()">Supprimer mon compte</button>

  </section>
</template>



<script>
import ApiService from '../api-service';
export default {
    name: 'profil',
    data(){
    return {
        data:JSON.parse(localStorage.getItem('user')),
        userId: localStorage.getItem('userId'),
        user:"",
    }
},
mounted(){
    //Appel à API pour affichage des infos utilisateur
      console.log(this.userId);
      ApiService.getOneUser(this.userId) 
       .then(response => {
          console.log(response.data.id)
          this.user = response.data
         
        })
        .catch(error => console.log(error)) 
    },
methods:{
    deleteOneUser() {//Fonction permettant à utilisateur de supprimer son compte 
  
        if ( confirm('Voulez-vous vraiment supprimer votre compte ?') ) {
          const id =  localStorage.getItem('userId');
          console.log(id);
          ApiService.deleteUser(id);
          localStorage.clear();
          alert('votre compte a bien été supprimé !');
          this.$router.push('/');
       } else {
          return;
        }
    },
}
}
</script>

<style lang="scss" scoped>
.profil {
    background-color: #fff;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 15px;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 0px 10px #e2e2e2;
    max-width: 300px;

    &_title {
        margin: 0;
    }

    &_wrapper {

        &--content {
            color: #808080;

            strong {
                color: #000;
            }
        }
    }
    &_del-btn {
        background-color: #fd2d02;
        color: #FFF;
        border-radius: 10px;
        border: none;
        padding: .5rem;
        box-shadow: 2px 3px 10px #e2e2e2;
        font-weight: bold;

        &:hover {
            opacity: 0.9;
            box-shadow: 1px 1px 10px #808080;
            cursor: pointer;
        }
    }
}
</style>