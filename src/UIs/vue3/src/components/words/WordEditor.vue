<template>
    <Dialog
        :visible="editting"
        @update:visible="CLOSE_WORD_MODAL"
        :modal="true"
        :closeOnEscape="true"
        class="dialog-no-padding"
        :dismissableMask="true"
    >
        <template #header>
            <div class="p-dialog-title">
                <span class="calendar-tag"></span>
                Edit
            </div>
        </template>
        <Card class="word-detail-card">
            <template #content>
                <div class="p-fluid">
                    <div class="p-field p-grid">
                        <label
                            for="text"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >Text</label
                        >
                        <div class="p-col-12 p-md-7">
                            <InputText
                                id="text"
                                type="text"
                                v-model="wordCustom.text"
                            />
                        </div>
                    </div>
                    <div class="p-field p-grid">
                        <label
                            for="description"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >Description</label
                        >
                        <div class="p-col-12 p-md-10">
                            <Textarea
                                id="description"
                                rows="5"
                                v-model="wordCustom.description"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div style="text-align: end">
                    <Button
                        icon="pi pi-check"
                        label="Save"
                        @click="UPDATE_WORD_CUSTOM"
                    />
                    <Button
                        icon="pi pi-times"
                        label="Cancel"
                        class="p-button-secondary"
                        style="margin-left: 0.5em"
                        @click="CLOSE_WORD_MODAL"
                    />
                </div>
            </template>
        </Card>
    </Dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { createNamespacedHelpers, useStore } from "vuex";
import { displayFullTime } from "../../utils/date";
import ACTIONTYPES from "../../store/modules/word/actionTypes";
import TYPES from "../../store/modules/word/mutationTypes";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers("word");

export default defineComponent({
    computed: {
        ...mapState(["wordCustom", "editting"]),
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        displayFullTime,
        ...mapMutations(TYPES),
        ...mapActions(ACTIONTYPES),
    },
    data() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.word-detail-card {
    width: 800px;
}

@media screen and (max-width: 900px) {
    .word-detail-card {
        width: calc(100vw - 5rem);
    }
}
</style>