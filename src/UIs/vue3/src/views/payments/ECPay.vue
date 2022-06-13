<template>
    <form v-if="payment.url" :action="payment.url" method="post" ref="form">
        <input type="hidden" v-for="(key, i) in checkoutKeys" :key="i" :name="key" :value="payment.data[key]" />
    </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("payment");

export default defineComponent({
    setup() {
        const form = ref<HTMLFormElement>();
        return {
            form
        }
    },
    async mounted() {
        await this.FETCH_PAYMENT();
        this.form?.submit();
    },
    computed: {
        ...mapState(["payment", "checkoutKeys"]),
        ...mapGetters([]),
    },
    methods: {
        ...mapActions(["FETCH_PAYMENT"]),
    },
});
</script>
<style lang="scss" scoped>
</style>