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
                            v-model="v$.product.name.$model"
                            @input="v$.product.name.$touch()"
                            :class="{
                                'is-invalid':
                                    isSubmitted && v$.product.name.$invalid,
                            }"
                        />
                        <span v-if="v$.product.name.$error && isSubmitted">
                            <span
                                id="name-error"
                                v-for="(error, index) of v$.product.name
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
                            v-model="product.code"
                            :class="{
                                'is-invalid':
                                    isSubmitted && v$.product.code.$invalid,
                            }"
                            @input="v$.product.code.$touch()"
                        />
                        <span v-if="v$.product.code.$error && isSubmitted">
                            <span
                                id="code-error"
                                v-for="(error, index) of v$.product.code
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
                            v-model="product.description"
                            :class="{
                                'is-invalid':
                                    isSubmitted &&
                                    v$.product.description.$invalid,
                            }"
                            @input="v$.product.description.$touch()"
                        />
                        <span
                            v-if="v$.product.description.$error && isSubmitted"
                        >
                            <span
                                id="description-error"
                                v-for="(error, index) of v$.product.description
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
import useVuelidate, { Validation } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import { Ref } from 'vue';

const { mapState, mapActions } = createNamespacedHelpers("product");

export default {
    setup() {
        const store = useStore();
        const { t } = useI18n();

        interface ValidType {
            product: any;
        }
        
        return {
            v$: <Ref<Validation<ValidType>>>useVuelidate(),
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
            product: {
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
            return this.$route.params.id ? "Edit Product" : "Add Product";
        },
        id() {
            return this.$route.params.id;
        },
        ...mapState(["product", "loading"]),
    },
    methods: {
        onSubmit() {
            this.isSubmitted = true;
            if (this.v$.product.$invalid) {
                return;
            }

            const actionType = this.id ? "updateProduct" : "addProduct";
            this.store
                .dispatch("product/" + actionType, this.product)
                .then(() => {
                    this.$router.push({ name: "Products" });
                });
        },
        cancel() {
            this.$router.back();
        },
        ...mapActions(["fetchProduct"]),
    },
    created() {
        const id = this.$route.params.id;
        if (id) {
            this.fetchProduct(id);
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