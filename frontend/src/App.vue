<template>
  <div class="app">
    <Header :key="$route.fullPath" />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

body {
  margin: 0;
  background-color: #f2f3f9;
  font-family: "Montserrat";
}

#app {
  padding: 1rem 0;
  margin: auto;
  max-width: 750px;
}

input:focus-visible,
input:focus-visible {
  outline: none;
}
</style>
