<template>
    <div>
        
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("payment");

export default defineComponent({
    setup() {},
    computed: {
        ...mapState([]),
        ...mapGetters([]),
    },
    mapActions: {
        ...mapActions([]),
    },
});
</script>
<style lang="scss" scoped>
</style>