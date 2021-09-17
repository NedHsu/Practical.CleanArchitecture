<template>
    <div class="Home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
        <router-link to="/products">Go to Products</router-link>
    </div>
</template>
<script lang="ts">
import HelloWorld from "../components/HelloWorld.vue";

export default {
    components: {
        HelloWorld,
    },
};
</script>
<style lang="scss" scoped>
.Home {
    text-align: center;
}
</style>