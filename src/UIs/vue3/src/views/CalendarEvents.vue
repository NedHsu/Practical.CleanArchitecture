<template>
    <div>
        <div class="calendar-toolbar">
            <div class="left">
                <SelectButton
                    v-model="calendarView"
                    :options="calendarViews"
                    optionLabel="name"
                    @click="calendarViewSelected"
                />
            </div>
            <div class="center">{{ dateStart }} ~ {{ dateEnd }}</div>
            <div class="right">
                <Button label="Today" class="p-button-rounded p-button-outlined" />
                <Button
                    icon="pi pi-angle-left"
                    class="p-button-rounded p-button-outlined"
                    @click="calendarViewPrev"
                />
                <Button
                    icon="pi pi-angle-right"
                    class="p-button-rounded p-button-outlined"
                    @click="calendarViewNext"
                />
            </div>
        </div>
        <div id="calendar"></div>
        <Spinner :loading="loading" :fullscreen="true"></Spinner>
    </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState, useStore } from 'vuex';
import Spinner from '../components/Spinner.vue';
import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import ACTIONS from '../store/modules/calendarEvent/actionTypes';

export default defineComponent({
    components: {
        Spinner
    },
    computed: {
        ...mapGetters("calendarEvent", [
            // "calendarEvents"
        ]),
        ...mapState("calendarEvent", [
            "calendarEvents",
            "calendarEvent",
            "loading"
        ]),
        dateStart() {
            console.log(this.calendarState);
            return dayjs(this.calendar.getDateRangeStart().toDate()).format("YYYY-MM-DD");
        },
        dateEnd() {
            this.calendarState;
            return dayjs(this.calendar.getDateRangeEnd().toDate()).format("YYYY-MM-DD");
        }
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
            week: {
                // narrowWeekend: true,
                // timezonesCollapsed: true,
                // showTimezoneCollapseButton: true,
                // hourStart: 6,
                // hourEnd: 24
            },
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
        const beforeCreateSchedule = async (event: any) => {
            let calendarId = '1';
            let calendarEvent = {
                calendarId: calendarId,
                title: event.title,
                isAllDay: event.isAllDay,
                start: event.start,
                end: event.end,
                category: "time",
                isVisible: true,
            }
            calendar.createSchedules([await store.dispatch(`calendarEvent/${ACTIONS.ADD_CALENDAR_EVENTS}`, calendarEvent)]);
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
            console.log(event);
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
        deleteCalendarEvent(id: string) {
            console.log(id);
        },
        calendarViewSelected() {
            this.calendar.changeView(this.calendarView.value, true);
            this.calendarState++;
        },
        calendarViewNext() {
            this.calendar.next();
            this.calendarState++;
        },
        calendarViewPrev() {
            this.calendar.prev()
            this.calendarState++;
        }
    },
    data() {
        return {
            calendarState: 0,
            calendarView: { name: 'Monthly', value: 'month' },
            calendarViews: [
                { name: 'Monthly', value: 'month' },
                { name: 'Weekly', value: 'week' },
            ]
        }
    },
});
</script>
<style lang="scss" scoped>
.calendar-toolbar {
    display: flex;
    padding: 10px;
    // background: ;
    button {
        margin-left: 5px;
    }
    .left {
        float: left;
    }
    .right {
        float: right;
    }
    .center {
        display: inline-block;
        margin: auto;
    }
}
</style>

<style>
div::-webkit-scrollbar-thumb {
    background-color: #8070d4;
    border-radius: 100px;
}
div::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}
div::-webkit-scrollbar {
    width: 8px;
}
</style>