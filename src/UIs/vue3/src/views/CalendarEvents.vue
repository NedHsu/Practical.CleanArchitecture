<template>
    <div>
        <Toolbar class="calendar-toolbar">
            <template #left>
                <SelectButton v-model="calendarView" :options="calendarViews" optionLabel="name" @click="calendarViewSelected" />
            </template>
            <template #right>
                <Button label="Today" class="p-button-rounded p-button-outlined" />
                <Button icon="pi pi-angle-left" class="p-button-rounded p-button-outlined" />
                <Button icon="pi pi-angle-right" class="p-button-rounded p-button-outlined" />
            </template>
        </Toolbar>
        <div v-if="loading">loading</div>
        <div id="calendar"></div>
    </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState, useStore } from 'vuex';

import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { useI18n } from "vue-i18n";

export default defineComponent({
    computed: {
        ...mapGetters("calendarEvent", [
            // "calendarEvents"
        ]),
        ...mapState("calendarEvent", [
            "calendarEvents",
            "loading"
        ]),
    },
    props: {

    },
    setup() {
        const { t } = useI18n({ useScope: 'global' })
        const store = useStore()
        const calendar = new Calendar('#calendar', {
            defaultView: 'month',
            useCreationPopup: true,
            useDetailPopup: true,
            taskView: true,
            scheduleView: true,
            calendars: [
                {
                    id: "1",
                    name: "事件",
                    color: '#e8e8e8',
                    bgColor: '#585858',
                    borderColor: '#a1b56c',
                    dragBgColor: '#585858',
                },
            ],
            template: {
                monthDayname: function (dayname) {
                    return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
                },
                popupSave: () => {
                    return t('labels.save');
                },
                popupDelete: () => {
                    return t('delete');
                },
                schedule: (schedule) => {
                    return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
                },
                task: (schedule) => {
                    return "123" + schedule.title;
                }
            }
        });
        const beforeCreateSchedule = (event: any) => {
            var calendarId = '1';
            calendar.createSchedules([{
                id: event.guide,
                calendarId: calendarId,
                title: event.title,
                isAllDay: event.isAllDay,
                start: event.start,
                end: event.end,
                category: "time",
                isVisible: true,
            }]);
        };
        const beforeUpdateSchedule = (event: any) => {
        };
        const beforeDeleteSchedule = (event: any) => {
        };
        const clickDayname = (event: any) => {
            console.log(event);
        };
        const clickMore = (event: any) => {
        };
        const clickSchedule = (event: any) => {
        };
        const clickTimezonesCollapseBtn = (event: any) => {
        };
        calendar.on('beforeCreateSchedule', beforeCreateSchedule);
        calendar.on('beforeUpdateSchedule', beforeUpdateSchedule);
        calendar.on('beforeDeleteSchedule', beforeDeleteSchedule);
        calendar.on('clickDayname', clickDayname);
        calendar.on('clickMore', clickMore);
        calendar.on('clickSchedule', clickSchedule);
        calendar.on('clickTimezonesCollapseBtn', clickTimezonesCollapseBtn);
        calendar.on('afterRenderSchedule', clickTimezonesCollapseBtn);

        onMounted(() => {
            store.dispatch("calendarEvent/FETCH_CALENDAR_EVENTS").then(() => {
                console.log(store.state.calendarEvent.calendarEvents)
            })
            console.log("onMounted");
        })

        onUnmounted(() => {
            calendar.destroy();
        })

        return { calendar }
    },
    methods: {
        ...mapActions("calendarEvent", [
            "FETCH_CALENDAR_EVENTS"
        ]),
        deleteCalendarEvent(id: string) {
            console.log(id);
        },
        calendarViewSelected() {
            this.calendar.changeView(this.calendarView.value, true);
        }
    },
    data() {
        return {
            calendarView: { name: 'Monthly', value: 'month' },
            calendarViews: [
                { name: 'Monthly', value: 'month' },
                { name: 'Weekly', value: 'week'},
            ]
        }
    },
});
</script>
<style lang="scss" scoped>
.calendar-toolbar {
    button {
        margin-left: 5px;
    }
}
</style>