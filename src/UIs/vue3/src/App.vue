<template>
  <div id="app">
    <Nav1></Nav1>
    <router-view class="router-view" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Nav1 from './components/Nav.vue'

export default {
  components: {
    Nav1
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      transitionName: 'slide-left'
    })
    router.beforeEach((to: any, from: any) => {
      if (to.meta?.index > from.meta?.index) {
        state.transitionName = 'slide-left' // 向左滑動
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = ''   // 同級無過場效果
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
