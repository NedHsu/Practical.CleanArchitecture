<template>
    <div>
        <DataTable
            :value="words.filter((x) => x.action != Actions.delete)"
            stripedRows
            responsiveLayout="scroll"
        >
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
            <Column header="Text">
                <template #body="{ data, index }">
                    <InputText
                        v-model="data.text"
                        :class="{
                            'p-invalid':
                                isSubmitted &&
                                v$.words.$each.$response.$errors[index].text
                                    .length,
                        }"
                        autofocus
                    />
                    <small
                        v-show="isSubmitted"
                        v-for="error in v$.words.$each.$response.$errors[index]
                            .text"
                        :key="error"
                        class="p-error"
                    >
                        {{ error.$message }}
                    </small>
                </template>
            </Column>
            <Column header="PartOfSpeech">
                <template #body="{ data }">
                    <Dropdown
                        v-model="data.partOfSpeech"
                        :options="partOfSpeechOptions"
                        optionLabel="text"
                        optionValue="text"
                        autofocus
                    />
                </template>
            </Column>
            <Column header="Description">
                <template #body="{ data }">
                    <Textarea rows="5" v-model="data.description" autofocus />
                </template>
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
                <template #body="{ data }">
                    <router-link
                        :to="{
                            name: 'WordEdit',
                            params: { id: data.id },
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
                        @click="deleteWord(data)"
                    />
                </template>
            </Column>
            <template #footer>
                <div class="p-d-flex p-jc-between p-ai-center">
                    <div class="buttons">
                        <Button icon="" @click="pushWord">Add</Button>

                        <Button icon="" @click="submit">Save</Button>
                    </div>
                    > In total there are
                    {{ words ? words.length : 0 }} words.
                </div>
            </template>
        </DataTable>
        <Spinner :loading="loading" :fullscreen="true"></Spinner>
    </div>
</template>
<script lang="ts">
import { onUnmounted } from "@vue/runtime-core";
import { createNamespacedHelpers, useStore } from "vuex";
import { useVuelidate, Validation } from "@vuelidate/core";
import { Ref } from "vue";
import { Word } from "../../store/modules/word/types";
import { helpers, maxLength, required } from "@vuelidate/validators";
import { Actions } from "../../store/types";

const { mapState, mapActions } = createNamespacedHelpers("word");

interface ValidType {
    words: Array<Word>;
}

export default {
    computed: {
        ...mapState(["words", "loading"]),
    },
    props: {},
    setup() {
        const store = useStore();
        onUnmounted(() => {});

        return {
            store,
            v$: <Ref<Validation<ValidType>>>useVuelidate(),
            Actions,
        };
    },
    mounted() {
        const { pageSize, pageIndex } = this;
        this.FETCH_WORDS({
            pageSize,
            pageIndex,
        });
    },
    data() {
        return {
            isSubmitted: false,
            pageSize: 20,
            pageIndex: 1,
            partOfSpeechOptions: [
                {
                    text: "adj",
                },
                {
                    text: "noun",
                },
                {
                    text: "verb",
                },
                {
                    text: "adv",
                },
                {
                    text: "pron",
                },
            ],
        };
    },
    methods: {
        addWord() {
            this.$router.push({
                name: "WordAdd",
            });
        },
        pushWord() {
            this.words.push({
                text: "",
                partOfSpeech: "noun",
                action: Actions.new,
            } as Word);
        },
        deleteWord(word: Word) {
            word.action = Actions.delete;
        },
        submit() {
            this.isSubmitted = true;
            if (this.v$.words.$invalid) {
                return;
            }

            this.UPDATE_WORDS();
        },
        ...mapActions(["FETCH_WORDS", "DEL_WORD", "UPDATE_WORDS"]),
    },
    validations() {
        return {
            words: {
                $each: helpers.forEach({
                    text: {
                        required,
                        maxLength: maxLength(100),
                    },
                }),
            },
        };
    },
};
</script>
<style lang="scss" scoped>
.buttons {
    Button {
        margin-right: 0.625rem;
    }
}
</style>