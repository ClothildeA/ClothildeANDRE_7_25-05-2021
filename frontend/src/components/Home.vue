<template>
    <section class="home" id="home">
        <div class="home_item">
            <p class="home_item--text">J'ai déjà un compte</p>
            <button class="home_item--btn">Je me connecte</button>
       </div>

       <p>- ou -</p>
        <div class="home_item">
            <p class="home_item--text">Je n'ai pas encore de compte</p>
            <button class="home_item--btn">Je m'inscris</button>
       </div>
    </section>  
</template>

<script>
export default {
    name : 'Home'
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
    }
}
</style>
