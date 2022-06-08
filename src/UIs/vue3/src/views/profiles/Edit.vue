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
                            v-model="v$.profile.name.$model"
                            @input="v$.profile.name.$touch()"
                            :class="{
                                'p-invalid':
                                    isSubmitted && v$.profile.name.$invalid,
                            }"
                        />
                        <span v-if="v$.profile.name.$error && isSubmitted">
                            <span
                                id="name-error"
                                v-for="(error, index) of v$.profile.name
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
                            v-model="profile.code"
                            :class="{
                                'p-invalid':
                                    isSubmitted && v$.profile.code.$invalid,
                            }"
                            @input="v$.profile.code.$touch()"
                        />
                        <span v-if="v$.profile.code.$error && isSubmitted">
                            <span
                                id="code-error"
                                v-for="(error, index) of v$.profile.code
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
                            v-model="profile.description"
                            :class="{
                                'p-invalid':
                                    isSubmitted &&
                                    v$.profile.description.$invalid,
                            }"
                            @input="v$.profile.description.$touch()"
                        />
                        <span
                            v-if="v$.profile.description.$error && isSubmitted"
                        >
                            <span
                                id="description-error"
                                v-for="(error, index) of v$.profile.description
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

const { mapState, mapActions } = createNamespacedHelpers("profile");

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
            profile: {
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
            return this.$route.params.id ? "Edit Profile" : "Add Profile";
        },
        id() {
            return this.$route.params.id;
        },
        ...mapState(["profile", "loading"]),
    },
    methods: {
        onSubmit() {
            this.isSubmitted = true;
            if ((this.v$ as any).profile.$invalid) {
                return;
            }

            const actionType = this.id ? "UPDATE_PROFILE" : "ADD_PROFILE";
            this.store
                .dispatch("profile/" + actionType, this.profile)
                .then(() => {
                    this.$router.push({ name: "Profiles" });
                });
        },
        cancel() {
            this.$router.back();
        },
        ...mapActions(["FETCH_PROFILE"]),
    },
    created() {
        const id = this.$route.params.id;
        if (id) {
            this.FETCH_PROFILE(id);
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