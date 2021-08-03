<template>
    <div>
        <NewPost></NewPost>
        <Post></Post>
    </div>
</template>


<script>
import Post from "../components/Post";
import NewPost from "../components/NewPost";
export default {
    name: "posts",
    components: {
        Post,
        NewPost
    }
}
</script>

<style>
</style>