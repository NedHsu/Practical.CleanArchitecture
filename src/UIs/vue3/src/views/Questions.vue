<template>
    <div>
        <div v-if="loading">loading</div>
        <DataTable :value="questions" stripedRows responsiveLayout="scroll">
            <template #header>
                <div class="table-header">Questions</div>
            </template>
            <Column header="Image">
                <template #body="slotProps">
                    <img
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        :alt="slotProps.data.image"
                        class="question-image"
                    />
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description">
                <template #body="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">{{
                    slotProps.data.price || 5
                }}</template>
            </Column>
            <Column header="Edit">
                <template #body="slotProps">
                    <router-link :to="'/questions/edit/' + slotProps.data.id"
                        ><Button
                            icon="pi pi-pencil"
                            class="
                                p-button-rounded p-button-text p-button-plain
                            " /></router-link
                    >&nbsp;
                    <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-text p-button-plain"
                        @click="deleteQuestion(slotProps.data)"
                    />
                </template>
            </Column>
            <template #footer>
                <div class="p-d-flex p-jc-between p-ai-center">
                    <div class="buttons">
                        <Button icon="" @click="addQuestion">Add</Button>

                        <Button icon="" @click="save">Save</Button>
                    </div>
                    n total there are
                    {{ questions ? questions.length : 0 }} questions.
                </div>
            </template>
        </DataTable>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { createNamespacedHelpers, useStore } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("question");

export default defineComponent({
    computed: {
        ...mapState(["questions", "loading"]),
    },
    props: {},
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch("question/FETCH_QUESTIONS").then(() => {
                console.log(store.state.question.questions);
            });
            console.log("onMounted");
        });
        onUnmounted(() => {});
    },
    methods: {
        ...mapActions(["FETCH_QUESTIONS"]),
        deleteQuestion(record: any) {
            console.log(record);
        },
        addQuestion() {
            this.questions.push({});
        },
        save() {},
    },
});
</script>
<style lang="scss" scoped>
.buttons {
    Button {
        margin-right: 0.625rem;
    }
}
</style>