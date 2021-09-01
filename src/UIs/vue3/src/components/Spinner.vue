<template>
    <div :class="fullscreen ? 'fullscreen' : 'container'"  :hidden="!fullscreen || !loading">
        <div class="inner">
            <slot></slot>
        </div>
        <div class="mask" :hidden="!loading"></div>
        <div class="icon" :hidden="!loading">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svg"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <g>
                    <circle cx="60" cy="50" r="4" fill="#e15b64">
                        <animate
                            attributeName="cx"
                            repeatCount="indefinite"
                            dur="1s"
                            values="95;35"
                            keyTimes="0;1"
                            begin="-0.67s"
                        />
                        <animate
                            attributeName="fill-opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;1;1"
                            keyTimes="0;0.2;1"
                            begin="-0.67s"
                        />
                    </circle>
                    <circle cx="60" cy="50" r="4" fill="#e15b64">
                        <animate
                            attributeName="cx"
                            repeatCount="indefinite"
                            dur="1s"
                            values="95;35"
                            keyTimes="0;1"
                            begin="-0.33s"
                        />
                        <animate
                            attributeName="fill-opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;1;1"
                            keyTimes="0;0.2;1"
                            begin="-0.33s"
                        />
                    </circle>
                    <circle cx="60" cy="50" r="4" fill="#e15b64">
                        <animate
                            attributeName="cx"
                            repeatCount="indefinite"
                            dur="1s"
                            values="95;35"
                            keyTimes="0;1"
                            begin="0s"
                        />
                        <animate
                            attributeName="fill-opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;1;1"
                            keyTimes="0;0.2;1"
                            begin="0s"
                        />
                    </circle>
                </g>
                <g transform="translate(-15 0)">
                    <path
                        d="M50 50L20 50A30 30 0 0 0 80 50Z"
                        fill="#f8b26a"
                        transform="rotate(90 50 50)"
                    />
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;45 50 50;0 50 50"
                            keyTimes="0;0.5;1"
                        />
                    </path>
                    <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;-45 50 50;0 50 50"
                            keyTimes="0;0.5;1"
                        />
                    </path>
                </g>
            </svg>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['loading', 'fullscreen']
});
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    .inner {
        width: 100%;
        height: 100%;
        z-index: 0;
    }
}

.fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1999;
}

.icon {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
    opacity: 1;
    z-index: 2001;
}
.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.3;
    z-index: 2000;
}

.svg {
    margin: auto;
    display: block;
    shape-rendering: auto;
}
</style>