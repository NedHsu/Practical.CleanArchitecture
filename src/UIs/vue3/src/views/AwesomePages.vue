<template>
    <div>
        <TabMenu :model="components">
            <template #item="{ item }">
                <a
                    role="presentation"
                    :class="{
                        'p-menuitem-link': true,
                        'p-highlight': displayComponentId == item.componentId,
                    }"
                    @click="displayComponent(item.componentId)"
                >
                    <span class="p-menuitem-text">{{ item.label }}</span>
                </a>
            </template>
        </TabMenu>
        <component :is="displayComponentId"></component>
        <Button @click="showDialog">Show</Button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import AwesomePage1 from "@components/awesomePages/AwesomePage1.vue";
import AwesomePage2 from "@components/awesomePages/AwesomePage2.vue";
import AwesomePage3 from "@components/awesomePages/AwesomePage3.vue";
import AwesomePage4 from "@components/awesomePages/AwesomePage4.vue";
import AwesomePage5 from "@components/awesomePages/AwesomePage5.vue";
import AwesomePage6 from "@components/awesomePages/AwesomePage6.vue";
import AwesomePage7 from "@components/awesomePages/AwesomePage7.vue";
import AwesomePage8 from "@components/awesomePages/AwesomePage8.vue";
import AwesomePage9 from "@components/awesomePages/AwesomePage9.vue";

export default defineComponent({
    components: {
        AwesomePage1,
        AwesomePage2,
        AwesomePage3,
        AwesomePage4,
        AwesomePage5,
        AwesomePage6,
        AwesomePage7,
        AwesomePage8,
        AwesomePage9,
    },
    setup() {},
    mounted() {
        console.log(this.components);
    },
    data() {
        return {
            displayComponentId: "AwesomePage1",
            components: [
                { label: "AwesomePage1", componentId: "AwesomePage1" },
                { label: "AwesomePage2", componentId: "AwesomePage2" },
                { label: "AwesomePage3", componentId: "AwesomePage3" },
                { label: "AwesomePage4", componentId: "AwesomePage4" },
                { label: "AwesomePage5", componentId: "AwesomePage5" },
                { label: "AwesomePage6", componentId: "AwesomePage6" },
                { label: "AwesomePage7", componentId: "AwesomePage7" },
                { label: "AwesomePage8", componentId: "AwesomePage8" },
                { label: "AwesomePage9", componentId: "AwesomePage9" },
            ],
        };
    },
    methods: {
        displayComponent(componentId: string) {
            this.displayComponentId = componentId;
        },
    },
});
</script>
<style lang="scss" scoped>
.display-container {
    > div {
        position: relative;
        width: 600px;
        height: 200px;
        left: 50%;
        top: 0%;
        margin-left: -300px; /*half the width*/
    }
}
.p-highlight {
    background: transparent!important;
    color: var(--primary-color)!important;
    border-bottom: 1px solid var(--primary-color)!important;
}
</style>