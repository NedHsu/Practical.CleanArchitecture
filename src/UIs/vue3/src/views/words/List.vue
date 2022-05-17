<template>
    <div>
        <DataTable :value="words" stripedRows responsiveLayout="scroll">
            <template #header>
                <div class="p-d-flex p-jc-between p-ai-center">
                    <div class="table-header">Words</div>
                    <span class="p-input-icon-left">
                        <Button
                            class="p-button-outlined"
                            label="Add"
                            @click="addWord"
                        />
                    </span>
                </div>
            </template>
            <Column header="Image">
                <template #body="slotProps">
                    <img
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        :alt="slotProps.data.image"
                        class="word-image"
                    />
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="price" header="Price">
                <template #body="slotProps">{{
                    slotProps.data.price || 5
                }}</template>
            </Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <Rating
                        :modelValue="slotProps.data.starRating || 4"
                        :readonly="true"
                        :cancel="false"
                    />
                </template>
            </Column>
            <Column header="Edit">
                <template #body="slotProps">
                    <router-link
                        :to="{
                            name: 'WordEdit',
                            params: { id: slotProps.data.id },
                        }"
                        ><Button
                            icon="pi pi-pencil"
                            class="
                                p-button-rounded p-button-text p-button-plain
                            " /></router-link
                    >&nbsp;
                    <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-text p-button-plain"
                        @click="deleteWord(slotProps.data.id)"
                    />
                </template>
            </Column>
            <template #footer
                >In total there are
                {{ words ? words.length : 0 }} words.</template
            >
        </DataTable>
        <Spinner :loading="loading" :fullscreen="true"></Spinner>
    </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted, withCtx } from "@vue/runtime-core";
import { createNamespacedHelpers, useStore } from "vuex";
import Spinner from "../../components/Spinner.vue";

const { mapState, mapActions, mapGetters } = createNamespacedHelpers("word");

export default {
    components: { Spinner },
    computed: {
        ...mapGetters([
            // "words"
        ]),
        ...mapState(["words", "loading"]),
    },
    props: {},
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch("word/fetchWords").then(() => {
                console.log(store.state.word.words);
            });
            console.log("onMounted");
        });
        onUnmounted(() => {});
    },
    methods: {
        addWord() {
            this.$router.push({
                name: "WordAdd",
            });
        },
        ...mapActions(["fetchWords", "deleteWord"]),
    },
};
</script>
<style lang="scss" scoped>
</style>