<template>
  <div id="app" v-if="isRouterAlive">
    <Nav1></Nav1>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Nav1 from './components/Nav.vue'

export default defineComponent({
  components: {
    Nav1
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      transitionName: 'slide-left'
    })
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => { isRouterAlive.value = true });
    }
    provide('reload', reload)
    return {
      isRouterAlive,
      ...toRefs(state)
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
}

.router-view {
  width: 100%;
  height: auto;
  position: relative;
  margin: 0 auto;
  padding: 10px;
  -webkit-overflow-scrolling: touch;
}
#app .p-menubar .p-submenu-list
{
  z-index: 999;
}
</style>
