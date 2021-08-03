<template>
    <section class="home">
        <Signup />
        <p>- ou -</p>
        <div class="home_item">
            <p class="home_item--text">J'ai déjà un compte</p>
            <button class="home_item--btn"><a href="#/login">Je me connecte</a></button>
       </div>
    </section>  
</template>

<script>
import Signup from "../components/Signup";

export default {
    name : 'Home',
    components: {
        Signup
    }
}

</script>

<style scoped lang="scss">
.home {
    text-align: -webkit-center;

    &_item {
        background: white;
        width: 65%;
        text-align: center;
        padding: 2rem;
        margin: 1rem;
        border-radius: 10px;
        box-shadow: 0px 10px 10px #e2e2e2;

        &--btn {
            background-color: #fd2d02;
            color: #FFF;
            border-radius: 10px;
            border: none;
            padding: .5rem;
            box-shadow: 2px 3px 10px #e2e2e2;

            &:hover {
                opacity: 0.9;
                box-shadow: 1px 1px 10px #808080;
            }

            a {
                color: #FFF;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
}

@media all and (min-width: 570px) {
    .home {
        max-width: 60%;
        margin: auto;
    }
}

</style>
