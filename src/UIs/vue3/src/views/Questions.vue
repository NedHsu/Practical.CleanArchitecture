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
            <Column field="description" header="Description"></Column>
            <Column field="price" header="Price">
                <template #body="slotProps">{{ slotProps.data.price || 5 }}</template>
            </Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.starRating || 4" :readonly="true" :cancel="false" />
                </template>
            </Column>
            <Column header="Edit">
                <template #body="slotProps">
                    <router-link :to="'/questions/edit/'+ slotProps.data.id"><Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-plain" /></router-link>&nbsp;
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-plain" @click="deleteQuestion(slotProps.data.id)" />
                </template>
            </Column>
            <template #footer>In total there are {{ questions ? questions.length : 0 }} questions.</template>
        </DataTable>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { mapActions, mapGetters, mapState, useStore } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters("question", [
            // "questions"
        ]),
        ...mapState("question", [
            "questions",
            "loading"
        ]),
    },
    props: {

    },
    setup() {
        const store = useStore()

        onMounted(() => {
            store.dispatch("question/FETCH_QUESTIONS").then(() => {
                console.log(store.state.question.questions)
            })
            console.log("onMounted")
        })
        onUnmounted(() => {

        })
    },
    methods: {
        ...mapActions("question", [
            "FETCH_QUESTIONS"
        ]),
        deleteQuestion(id: string) {
            console.log(id);
        }
    }
});
</script>
<style lang="scss" scoped>
</style>