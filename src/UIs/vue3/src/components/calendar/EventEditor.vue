<template>
    <Dialog
        :visible="editorOpened"
        @update:visible="closeEvent"
        :modal="true"
        class="dialog-no-padding"
        :closeOnEscape="true"
        header="Editor"
    >
        <Divider />
        <div class="calendar-event-form p-fluid">
            <div class="p-field p-grid">
                <label for="title" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                    >Title</label
                >
                <div class="p-col-12 p-md-10">
                    <InputText
                        id="title"
                        type="text"
                        v-model="calendarEvent.title"
                    />
                </div>
            </div>
            <div class="p-field p-grid">
                <label for="startDate" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Start</label>
                <div class="p-col-12 p-md-10">
                    <Calendar id="startDate" v-model="calendarEvent.start" :showTime="true" dateFormat="yy-mm-dd" />
                </div>
            </div>
            <div class="p-field p-grid">
                <label for="endDate" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">End</label>
                <div class="p-col-12 p-md-10">
                    <Calendar id="endDate" v-model="calendarEvent.end" :showTime="true" dateFormat="yy-mm-dd" />
                </div>
            </div>
        </div>
    </Dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState, useStore } from "vuex";

export default defineComponent({
    computed: {
        ...mapState("calendarEvent", ["calendarEvent"]),
        ...mapGetters("calendarEvent", ["editorOpened"]),
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        closeEvent() {
            this.store.commit("calendarEvent/CLOSE_CALENDAR_EVENT");
        },
    },
});
</script>
<style lang="scss" scoped>
.calendar-event-form {
    width: 800px;
    margin: 1rem;
}

@media screen and (max-width: 900px) {
    .calendar-event-form {
        width: calc(100vw - 5rem);
    }
}
</style>