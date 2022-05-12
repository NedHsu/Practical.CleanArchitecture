<template>
    <div>
        <DataTable :value="products" stripedRows responsiveLayout="scroll">
            <template #header>
                <div class="p-d-flex p-jc-between p-ai-center">
                    <div class="table-header">Products</div>
                    <span class="p-input-icon-left">
                        <Button
                            class="p-button-outlined"
                            label="Add"
                            @click="addProduct"
                        />
                    </span>
                </div>
            </template>
            <Column header="Image">
                <template #body="slotProps">
                    <img
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        :alt="slotProps.data.image"
                        class="product-image"
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
                            name: 'ProductEdit',
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
                        @click="deleteProduct(slotProps.data.id)"
                    />
                </template>
            </Column>
            <template #footer
                >In total there are
                {{ products ? products.length : 0 }} products.</template
            >
        </DataTable>
        <Spinner :loading="loading" :fullscreen="true"></Spinner>
    </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted, withCtx } from "@vue/runtime-core";
import { createNamespacedHelpers, useStore } from "vuex";
import Spinner from "../../components/Spinner.vue";

const { mapState, mapActions, mapGetters } = createNamespacedHelpers("product");

export default {
    components: { Spinner },
    computed: {
        ...mapGetters([
            // "products"
        ]),
        ...mapState(["products", "loading"]),
    },
    props: {},
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch("product/fetchProducts").then(() => {
                console.log(store.state.product.products);
            });
            console.log("onMounted");
        });
        onUnmounted(() => {});
    },
    methods: {
        addProduct() {
            this.$router.push({
                name: "ProductAdd",
            });
        },
        ...mapActions(["fetchProducts", "deleteProduct"]),
    },
};
</script>
<style lang="scss" scoped>
</style>