<template>
    <Dialog
        :visible="detailOpened"
        @update:visible="closeEvent"
        :modal="true"
        :closeOnEscape="true"
        :header="calendarEvent?.title"
        class="dialog-no-padding"
    >
        <template #header>
            <div class="p-dialog-title">
                <span class="calendar-tag"></span>
                {{ calendarEvent?.title }}
            </div>
        </template>
        <Divider />
        <Card style="width: 25em">
            <template #subtitle>
                <div>
                    Start:&nbsp;{{ displayFullTime(calendarEvent.start) }}
                </div>
                <div>
                    End:&nbsp;&nbsp;{{ displayFullTime(calendarEvent.end) }}
                </div>
            </template>
            <template #content>
                <p>
                    {{ calendarEvent.content }}
                </p>
            </template>
            <template #footer>
                <div style="text-align: end">
                    <Button
                        icon="pi pi-pencil"
                        label="Edit"
                        class="p-button-outlined"
                        @click="editEvent"
                    />
                    <Button
                        icon="pi pi-trash"
                        label="Delete"
                        class="p-button-outlined"
                        style="margin-left: 0.5em"
                        @click="deleteEvent"
                    />
                </div>
            </template>
        </Card>
    </Dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState, useStore } from "vuex";
import { displayFullTime } from "../../utils/date";
import ACTIONTYPES from "../../store/modules/calendarEvent/actionTypes";
import TYPES from "../../store/modules/calendarEvent/mutationTypes";

export default defineComponent({
    computed: {
        ...mapState("calendarEvent", ["calendarEvent"]),
        ...mapGetters("calendarEvent", ["detailOpened"]),
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        editEvent() {
            this.store.commit("calendarEvent/" + TYPES.EDIT_CALENDAR_EVENT);
        },
        deleteEvent() {
            this.store.dispatch("calendarEvent/" + ACTIONTYPES.DEL_CALENDAR_EVENT, this.calendarEvent.id);
        },
        closeEvent() {
            this.store.commit("calendarEvent/" + TYPES.CLOSE_CALENDAR_EVENT);
        },
        displayFullTime,
    },
});
</script>

<style lang="scss" scoped>
:deep(.p-dialog-header) {
    div {
        padding: 0.5rem;
    }
    color: red;
}
:deep(.p-card-content) {
    color: red;
}
</style>