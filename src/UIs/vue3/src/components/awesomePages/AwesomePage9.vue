<template>
    <div class="container">
        <div class="box"></div>
        <Button
            icon="pi pi-trash"
            label="Flyout"
            :class="floyoutClass"
            style="margin-left: 0.5em"
            @click="falyout"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            floyoutClass: {
                'p-button-outlined': true,
                'flyout': false,
            },
        }
    },
    methods: {
        falyout(e: PointerEvent, b: any) {
            console.log(e, b);
            this.floyoutClass.flyout = !this.floyoutClass.flyout;
        }
    }
});
</script>
<style lang="scss" scoped>
.container {
    width: 500px;
    height: 500px;
    position: relative;
    .box {
        animation: zoomin 0.5s linear infinite;
        position: absolute;
    }
}
.p-button-outlined {
    transition: all 0.5s ease-in;
}
.flyout {
    transform: scale(0.2, 0.2);
}

@keyframes zoomin {
    0% {
        background: black;
        top: 0;
        left: 0;
        height: 0.625rem;
        width: 1.25rem;
    }
    100% {
        background: white;
        top: 6.25rem;
        left: 6.25rem;
        width: 0;
        height: 0;
    }
}
</style>