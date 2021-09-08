<template>
    <div>
        <div class="p-fluid">
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" type="text" v-model="calendar.name" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
    data() {
        return {
            calendar: {
                name: "",
            }
        }
    }
});
</script>
<style lang="scss" scoped>
    
</style>