<template>
    <h1>Page B - Message from server: {{ msg }}</h1>
</template>
  
  <script>
import { useHead } from '@vueuse/head'
export default {
    name: 'PageB',
    props: {
        msg: String,
        server: Boolean,
        name: String,
    },
    setup() {
        useHead({
            title: 'PageB',
        })
    }
}
</script>