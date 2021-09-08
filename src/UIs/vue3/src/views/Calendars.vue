<template>
    <div>
        <Spinner>
            <DataTable :value="calendars" stripedRows responsiveLayout="scroll">
                <template #header>
                    <div class="table-header">Calendars</div>
                </template>
                <Column header="Image">
                    <template #body="slotProps">
                        <img
                            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                            :alt="slotProps.data.image"
                            class="calendar-image"
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
                        <Rating
                            :modelValue="slotProps.data.starRating || 4"
                            :readonly="true"
                            :cancel="false"
                        />
                    </template>
                </Column>
                <Column header="Edit">
                    <template #body="slotProps">
                        <router-link :to="'/calendars/edit/' + slotProps.data.id">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-text p-button-plain"
                            />
                        </router-link>&nbsp;
                        <Button
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-text p-button-plain"
                            @click="deleteCalendar(slotProps.data.id)"
                        />
                    </template>
                </Column>
                <template
                    #footer
                >In total there are {{ calendars ? calendars.length : 0 }} calendars.</template>
            </DataTable>
        </Spinner>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { mapActions, mapGetters, mapState, useStore } from 'vuex';
import Spinner from '../components/Spinner.vue';

export default defineComponent({
    computed: {
        ...mapGetters("calendar", [
            // "calendars"
        ]),
        ...mapState("calendar", [
            "calendars",
            "loading"
        ]),
    },
    props: {

    },
    setup() {
        const store = useStore()

        onMounted(() => {
            store.dispatch("calendar/FETCH_CALENDARS").then(() => {
                console.log(store.state.calendar.calendars)
            })
            console.log("onMounted")
        })
        onUnmounted(() => {

        })
    },
    methods: {
        ...mapActions("calendar", [
            "FETCH_CALENDARS"
        ]),
        deleteCalendar(id: string) {
            console.log(id);
        }
    }
});
</script>
<style lang="scss" scoped>
</style>