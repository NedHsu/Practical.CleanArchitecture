<template>
    <div>
        <div v-if="loading">loading</div>
        <div v-for="product in products" :key="product.id">{{product.id}}</div>
    </div>
</template>
<script lang="ts">import { onMounted, onUnmounted } from "@vue/runtime-core";
import store from "../store";
import { mapGetters, mapState } from 'vuex';

export default {
    computed: {
        ...mapGetters("product", [
            // "products"
        ]),
        ...mapState("product", [
            "products", 
            "loading"
        ])
    },
    setup() {
        onMounted(() => {
            store.dispatch("product/fetchProducts").then(() => {
                console.log(store.state.product.products)
            })
            console.log("onMounted")
        })
        onUnmounted(() => {

        })
    },
}
</script>
<style lang="scss" scoped>
</style>