<template>
    <Dialog
        :visible="editorOpened"
        @update:visible="closeEvent"
        :modal="true"
        class="dialog-no-padding"
        :closeOnEscape="true"
        header="Editor"
        :dismissableMask="true"
    >
        <template #header>
            <div class="header">Editor</div>
        </template>
        <Card>
            <template #content>
                <div class="calendar-event-form p-fluid">
                    <div class="p-field p-grid">
                        <label
                            for="calendarId"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >Calendar</label
                        >
                        <div class="p-col-12 p-md-2">
                            <Dropdown
                                inputId="calendarId"
                                v-model="selectedCalendar"
                                placeholder="Select Calendar"
                                :options="calendars"
                            >
                                <template #value="slotProps">
                                    <span
                                        v-if="slotProps.value"
                                        class="calendar-display"
                                        :style="{
                                            borderRadius: '3px',
                                            backgroundColor:
                                                '#' + slotProps.value.bgColor,
                                            borderColor:
                                                '#' +
                                                slotProps.value.borderColor,
                                            color: '#' + slotProps.value.color,
                                        }"
                                    >
                                        {{ slotProps.value.name }}
                                    </span>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <span
                                        class="calendar-display"
                                        :style="{
                                            borderRadius: '3px',
                                            backgroundColor:
                                                '#' + slotProps.option.bgColor,
                                            borderColor:
                                                '#' +
                                                slotProps.option.borderColor,
                                            color: '#' + slotProps.option.color,
                                        }"
                                    >
                                        {{ slotProps.option.name }}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="p-field p-grid">
                        <label
                            for="title"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >Title</label
                        >
                        <div class="p-col-12 p-md-10">
                            <InputText
                                id="title"
                                type="text"
                                v-model="formData.title"
                            />
                            <!-- <span>{{ formError.titleError.value }}</span> -->
                        </div>
                    </div>
                    <div class="p-field p-grid">
                        <label
                            for="isAllDay"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >isAllDay</label
                        >
                        <div class="p-col-12 p-md-10">
                            <Checkbox
                                id="isAllDay"
                                :binary="true"
                                v-model="formData.isAllDay"
                            />
                        </div>
                    </div>
                    <div class="p-field p-grid">
                        <label
                            for="startDate"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >Start</label
                        >
                        <div class="p-col-12 p-md-10">
                            <Calendar
                                id="startDate"
                                v-model="formData.start"
                                :showTime="true"
                                dateFormat="yy-mm-dd"
                            />
                        </div>
                    </div>
                    <div class="p-field p-grid">
                        <label
                            for="endDate"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >End</label
                        >
                        <div class="p-col-12 p-md-10">
                            <Calendar
                                id="endDate"
                                v-model="formData.end"
                                :showTime="true"
                                dateFormat="yy-mm-dd"
                            />
                        </div>
                    </div>
                    <div class="p-field p-grid">
                        <label
                            for="content"
                            class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                            >Content</label
                        >
                        <div class="p-col-12 p-md-10">
                            <Textarea
                                id="content"
                                rows="5"
                                v-model="formData.content"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Save" @click="saveChange" />
                <Button
                    icon="pi pi-times"
                    label="Cancel"
                    class="p-button-secondary"
                    style="margin-left: 0.5em"
                    @click="closeEvent"
                />
            </template>
        </Card>
    </Dialog>
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, reactive } from "vue";
import { mapActions, mapGetters, mapMutations, mapState, useStore } from "vuex";
import actionTypes from "../../store/modules/calendarEvent/actionTypes";
import mutationTypes from "../../store/modules/calendarEvent/mutationTypes";
import { useField } from 'vee-validate';
import * as yup from 'yup';
import { Calendar } from "../../store/modules/calendar/types";

export default defineComponent({
    computed: {
        ...mapState("calendar", ["calendars"]),
        ...mapState("calendarEvent", ["calendarEvent"]),
        ...mapGetters("calendarEvent", ["editorOpened"]),
    },
    setup() {
        const store = useStore();

        const { value: start, errorMessage: startError } = useField<Date>('start');
        const { value: end, errorMessage: endError } = useField<Date>('end');
        const { value: title, errorMessage: titleError } = useField<string>('title', yup.string().required());
        const { value: content, errorMessage: contentError } = useField<string>('content');
        const { value: calendarId, errorMessage: calendarIdError } = useField<string>('calendarId', yup.string().required());

        // init
        start.value = end.value = new Date();

        const formData = reactive({
            id: "",
            isAllDay: true,
            start: start,
            end: end,
            title: title,
            content: content,
            calendarId: calendarId,
        });

        const formError = {
            startError,
            endError,
            titleError,
            contentError,
            calendarIdError,
        }

        return { store };
    },
    methods: {
        ...mapMutations("calendarEvent", mutationTypes),
        ...mapActions("calendarEvent", actionTypes),
        closeEvent() {
            this.CLOSE_CALENDAR_EVENT();
            this.store.commit(
                "calendarEvent/" + mutationTypes.CLOSE_CALENDAR_EVENT
            );
        },
        saveChange() {
            if (this.formData.id) {
                this.UPDATE_CALENDAR_EVENT(this.formData);
            } else {
                this.ADD_CALENDAR_EVENT(this.formData);
            }
        },
    },
    watch: {
        calendarEvent(newVal) {
            this.formData = {
                ...newVal
            };
            if (this.formData.start && this.formData.end) {
                this.formData.start = dayjs(this.formData.start).toDate();
                this.formData.end = dayjs(this.formData.end).toDate();
            }

            if (this.formData.calendarId) {
                this.selectedCalendar = this.calendars.find(
                    (x: any) => x.id == this.formData.calendarId
                );
            } else if (this.selectedCalendar) {
                this.formData.calendarId = this.selectedCalendar.id;
            }
            console.log("watch calendarEvent");
        },
        selectedCalendar(newVal) {
            this.formData.calendarId = newVal ? newVal.id : "";
            console.log("watch selectedCalendar");
        },
    },
    data() {
        return {
            selectedCalendar: null as unknown as Calendar,
            formData: {
                id: "",
                isAllDay: true,
                start: new Date(),
                end: new Date(),
                title: "",
                content: "",
                calendarId: "",
            },
        };
    },
});
</script>
<style lang="scss" scoped>
.calendar-display {
    padding: 1px 5px;
    border: 1px solid;
    border-radius: 3px;
}

.calendar-event-form {
    width: 800px;
    margin: 1rem;
}

.dialog-no-padding {
    .header {
        width: 100%;
        text-align: center;
    }
}

@media screen and (max-width: 900px) {
    .calendar-event-form {
        width: calc(100vw - 5rem);
    }
}
</style>