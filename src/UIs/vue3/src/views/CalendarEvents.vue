<template>
    <div>
        <div class="calendar-container">
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
                    <Button
                        label="Today"
                        class="p-button-rounded p-button-outlined"
                    />
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
                    <Button
                        icon="pi pi-ellipsis-h"
                        class="p-button-rounded p-button-text p-button-plain"
                        @click="visibleRightTools = true"
                    />
                </div>
            </div>
            <div id="calendar" ref="refCalendar"></div>
        </div>
        <Sidebar
            v-model:visible="visibleRightTools"
            :modal="false"
            position="right"
        >
            <Menu :model="menuItems" style="width: auto" />
        </Sidebar>
    </div>
    <Spinner :loading="loading" :fullscreen="true"></Spinner>
</template>
<script lang="ts">
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { defineComponent, Ref, ref, watchEffect } from "vue";
import { mapGetters, mapState, useStore } from "vuex";
import Spinner from "../components/Spinner.vue";
import Calendar, {
    IEventObject,
    IEventScheduleObject,
    ISchedule,
    TZDate,
} from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import ACTIONS from "../store/modules/calendarEvent/actionTypes";

export default defineComponent({
    components: {
        Spinner,
    },
    computed: {
        ...mapGetters("calendarEvent", [
            // "calendarEvents"
        ]),
        ...mapState("calendarEvent", [
            "calendarEvents",
            "calendarEvent",
            "loading",
        ]),
        ...mapState("calendar", ["calendars"]),
    },
    props: {},
    setup() {
        const visibleRightTools = ref(false);
        const refCalendar = ref();
        const { t } = useI18n({ useScope: "global" });
        const store = useStore();
        const dateStart = ref("");
        const dateEnd = ref("");
        let tuiCalendarRef = ref<Calendar>();

        const setCalendarRange = (calendar: Calendar) => {
            if (calendar) {
                dateStart.value = dayjs(
                    calendar.getDateRangeStart().toDate()
                ).format("YYYY-MM-DD");
                dateEnd.value = dayjs(
                    calendar.getDateRangeEnd().toDate()
                ).format("YYYY-MM-DD");
            }
        };

        onMounted(() => {
            const tuiCalendar = new Calendar(refCalendar.value, {
                defaultView: "month",
                useCreationPopup: true,
                useDetailPopup: true,
                taskView: true,
                scheduleView: true,
                calendars: [],
                week: {
                    // narrowWeekend: true,
                    // timezonesCollapsed: true,
                    // showTimezoneCollapseButton: true,
                    // hourStart: 6,
                    // hourEnd: 24
                },
                template: {
                    monthDayname: function (dayname) {
                        return (
                            '<span class="calendar-week-dayname-name">' +
                            dayname.label +
                            "</span>"
                        );
                    },
                    popupSave: () => {
                        return t("labels.save");
                    },
                    popupDelete: () => {
                        return t("delete");
                    },
                    schedule: (schedule) => {
                        return (
                            '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
                            schedule.bgColor +
                            '">' +
                            schedule.title +
                            "</span>"
                        );
                    },
                    task: (schedule) => {
                        return "123" + schedule.title;
                    },
                },
            });
            setCalendarRange(tuiCalendar);

            const beforeCreateSchedule = async (event: ISchedule) => {
                let calendarEvent = {
                    calendarId: event.calendarId,
                    title: event.title,
                    isAllDay: event.isAllDay,
                    start: (event.start as TZDate).toDate(),
                    end: (event.end as TZDate).toDate(),
                    category: "time",
                    isVisible: true,
                };
                let result = await store.dispatch(
                    "calendarEvent/" + ACTIONS.ADD_CALENDAR_EVENT,
                    calendarEvent
                );
                console.log(result);
                tuiCalendar.createSchedules([result]);
            };
            const beforeUpdateSchedule = async (event: IEventObject) => {
                let schedule = {
                    ...event.schedule,
                    ...event.changes,
                };
                await store.dispatch(
                    "calendarEvent/" + ACTIONS.UPDATE_CALENDAR_EVENT,
                    {
                        id: schedule.id,
                        calendarId: schedule.calendarId,
                        title: schedule.title,
                        isAllDay: schedule.isAllDay,
                        start: (schedule.start as TZDate).toDate(),
                        end: (schedule.end as TZDate).toDate(),
                        category: "time",
                        isVisible: true,
                    }
                );
                tuiCalendar.updateSchedule(
                    schedule.id!,
                    schedule.calendarId!,
                    schedule
                );
            };
            const beforeDeleteSchedule = (event: IEventScheduleObject) => {
                console.log(event);
                store
                    .dispatch(
                        "calendarEvent/" + ACTIONS.DEL_CALENDAR_EVENT,
                        event.schedule.id
                    )
                    .then(() =>
                        tuiCalendar.deleteSchedule(
                            event.schedule.id!,
                            event.schedule.calendarId!
                        )
                    );
            };
            const clickDayname = (event: any) => {
                console.log(event);
            };
            const clickMore = () => {};
            const clickSchedule = (event: any) => {
                console.log(event);
            };
            const clickTimezonesCollapseBtn = () => {};
            tuiCalendar.on("beforeCreateSchedule", beforeCreateSchedule);
            tuiCalendar.on("beforeUpdateSchedule", beforeUpdateSchedule);
            tuiCalendar.on("beforeDeleteSchedule", beforeDeleteSchedule);
            tuiCalendar.on("clickDayname", clickDayname);
            tuiCalendar.on("clickMore", clickMore);
            tuiCalendar.on("clickSchedule", clickSchedule);
            tuiCalendar.on(
                "clickTimezonesCollapseBtn",
                clickTimezonesCollapseBtn
            );
            tuiCalendar.on("afterRenderSchedule", clickTimezonesCollapseBtn);
            tuiCalendarRef.value = tuiCalendar;

            store
                .dispatch("calendarEvent/" + ACTIONS.FETCH_CALENDAR_EVENTS)
                .then(() => {
                    console.log(store.state.calendarEvent.calendarEvents);
                });
            store.dispatch("calendar/FETCH_CALENDARS");

            console.log("onMounted");
        });

        onUnmounted(() => {
            tuiCalendarRef.value?.destroy();
        });

        return {
            refCalendar,
            visibleRightTools,
            tuiCalendarRef,
            dateStart,
            dateEnd,
            setCalendarRange,
        };
    },
    methods: {
        deleteCalendarEvent(id: string) {
            console.log(id);
        },
        calendarViewSelected() {
            this.tuiCalendarRef!.changeView(this.calendarView.value, true);
            this.calendarState++;
        },
        calendarViewNext() {
            this.tuiCalendarRef!.next();
            this.calendarState++;
        },
        calendarViewPrev() {
            this.tuiCalendarRef!.prev();
            this.calendarState++;
        },
    },
    watch: {
        calendars(newValue) {
            console.log(newValue);
            this.tuiCalendarRef?.setCalendars(
                newValue.map((x: any) => {
                    return {
                        ...x,
                        bgColor: "#" + x.bgColor,
                        borderColor: "#" + x.borderColor,
                        color: "#" + x.color,
                        dragBgColor: "#" + x.dragBgColor,
                    };
                })
            );
        },
        calendarEvents(newValue) {
            this.tuiCalendarRef?.createSchedules(newValue);
        },
        calendarState() {
            this.setCalendarRange(this.tuiCalendarRef!);
        },
    },
    data() {
        return {
            calendarState: 0,
            calendarView: { name: "Monthly", value: "month" },
            calendarViews: [
                { name: "Monthly", value: "month" },
                { name: "Weekly", value: "week" },
            ],
            menuItems: [
                {
                    label: "New Calendar",
                    icon: "pi pi-calendar-plus",
                    command: () => {
                        this.$router.push({
                            name: "CalendarAdd",
                        });
                    },
                },
                {
                    label: "Calendar List",
                    icon: "pi pi-calendar-minus",
                    command: () => {
                        this.$router.push({
                            name: "Calendars",
                        });
                    },
                },
            ],
        };
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

@media screen and (max-width: 500px) {
    .calendar-toolbar {
        display: grid;
        .left {
            width: 100vw;
            text-align: start;
        }
        .right {
            width: 100vw;
            text-align: end;
        }
        .center {
            width: 100vw;
            text-align: start;
            line-height: 3rem;
        }
    }
}
.sidebar-link {
    width: 100%;
    cursor: pointer;
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