<template>
    <Card>
        <template #title> {{ title }} </template>
        <template #content>
            <div class="alert alert-danger" v-show="postError">
                {{ postErrorMessage }}
            </div>
            <form>
                <div class="p-field p-grid">
                    <label for="name" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Name</label
                    >
                    <div class="p-col-12 p-md-10">
                        <InputText
                            id="name"
                            type="text"
                            v-model="v$.word.name.$model"
                            @input="v$.word.name.$touch()"
                            :class="{
                                'p-invalid':
                                    isSubmitted && v$.word.name.$invalid,
                            }"
                        />
                        <span v-if="v$.word.name.$error && isSubmitted">
                            <span
                                id="name-error"
                                v-for="(error, index) of v$.word.name
                                    .$errors"
                                :key="index"
                            >
                                <small class="p-error">{{
                                    error.$message
                                }}</small>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label for="code" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Code</label
                    >
                    <div class="p-col-12 p-md-10">
                        <InputText
                            id="code"
                            type="text"
                            v-model="word.code"
                            :class="{
                                'p-invalid':
                                    isSubmitted && v$.word.code.$invalid,
                            }"
                            @input="v$.word.code.$touch()"
                        />
                        <span v-if="v$.word.code.$error && isSubmitted">
                            <span
                                id="code-error"
                                v-for="(error, index) of v$.word.code
                                    .$errors"
                                :key="index"
                            >
                                <small class="p-error">{{
                                    error.$message
                                }}</small>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="description"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Description</label
                    >
                    <div class="p-col-12 p-md-10">
                        <InputText
                            id="description"
                            type="text"
                            v-model="word.description"
                            :class="{
                                'p-invalid':
                                    isSubmitted &&
                                    v$.word.description.$invalid,
                            }"
                            @input="v$.word.description.$touch()"
                        />
                        <span
                            v-if="v$.word.description.$error && isSubmitted"
                        >
                            <span
                                id="description-error"
                                v-for="(error, index) of v$.word.description
                                    .$errors"
                                :key="index"
                            >
                                <small class="p-error">{{
                                    error.$message
                                }}</small>
                            </span>
                        </span>
                    </div>
                </div>
            </form>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" @click="onSubmit" />
            <Button
                icon="pi pi-times"
                label="Cancel"
                class="p-button-secondary"
                style="margin-left: 0.5em"
                @click="cancel"
            />
        </template>
    </Card>
</template>

<script lang="ts">
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useStore, createNamespacedHelpers } from "vuex";
import useVuelidate from "@vuelidate/core";
import { useI18n } from "vue-i18n";

const { mapState, mapActions } = createNamespacedHelpers("word");

export default {
    setup() {
        const store = useStore();
        const { t } = useI18n();

        return {
            v$: useVuelidate(),
            store,
            t$: t,
        };
    },
    data() {
        return {
            postError: false,
            postErrorMessage: "",
            isSubmitted: false,
        };
    },
    validations() {
        return {
            word: {
                name: {
                    required: helpers.withMessage(
                        this.t$("valid.required"),
                        required
                    ),
                    minLength: minLength(3),
                },
                code: {
                    required,
                    maxLength: maxLength(10),
                },
                description: { required, maxLength: maxLength(100) },
            },
        };
    },
    computed: {
        title() {
            return this.$route.params.id ? "Edit Word" : "Add Word";
        },
        id() {
            return this.$route.params.id;
        },
        ...mapState(["word", "loading"]),
    },
    methods: {
        onSubmit() {
            this.isSubmitted = true;
            if ((this.v$ as any).word.$invalid) {
                return;
            }

            const actionType = this.id ? "UPDATE_WORD" : "ADD_WORD";
            this.store
                .dispatch("word/" + actionType, this.word)
                .then(() => {
                    this.$router.push({ name: "Words" });
                });
        },
        cancel() {
            this.$router.back();
        },
        ...mapActions(["FETCH_WORD"]),
    },
    created() {
        const id = this.$route.params.id;
        if (id) {
            this.FETCH_WORD(id);
        }
    },
};
</script>

<style scoped>
.field-error {
    border: 1px solid red;
}
.col-form-label {
    text-align: right;
}
</style>