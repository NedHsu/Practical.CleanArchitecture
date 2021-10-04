<template>
    <Toolbar class="">
        <template #left>
            <div></div>
        </template>
        <template #right>
            <div></div>
        </template>
    </Toolbar>
    <FullCalendar :options="options" ref="calendarRef" />
    <event-detail />
    <event-editor />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import "@fullcalendar/core";
import FullCalendar, {
    DateSelectArg,
    DatesSetArg,
    DateUnselectArg,
    EventAddArg,
    EventApi,
    EventChangeArg,
    EventClickArg,
    EventHoveringArg,
    EventRemoveArg,
    MoreLinkArg,
    ViewApi,
} from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { mapActions, mapGetters, mapState, useStore } from "vuex";
import ACTIONS from "../store/modules/calendarEvent/actionTypes";
import MUTATION from "../store/modules/calendarEvent/mutationTypes";
import CALENDAR_ACTIONS from "../store/modules/calendar/actionTypes";
import EventDetail from "../components/calendar/EventDetail.vue";
import EventEditor from "../components/calendar/EventEditor.vue";
import { CalendarEvent } from "../store/modules/calendarEvent/types";
import dayjs from "dayjs";

export default defineComponent({
    components: {
        FullCalendar,
        EventDetail,
        EventEditor,
    },
    computed: {
        ...mapState("calendarEvent", ["calendarEvents"]),
        ...mapGetters("calendar", ["calendarMap"]),
    },
    setup() {
        const store = useStore();
        const calendarRef = ref();
        const calendarEventsRef = ref(Array<CalendarEvent>());
        const dateStart = ref<Date>();
        const dateEnd = ref<Date>();

        const options = ref({
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            initialEvents: [],
            events: calendarEventsRef,
            eventClick: (arg: EventClickArg) => {
                store.commit(
                    "calendarEvent/" + MUTATION.OPEN_CALENDAR_EVENT,
                    arg.event.extendedProps.calendarEvent
                );
                console.log(arg);
            },
            select: (arg: DateSelectArg) => {
                store.commit("calendarEvent/" + MUTATION.EDIT_CALENDAR_EVENT, {
                    start: arg.start,
                    end: arg.end,
                    isAllDay: arg.allDay,
                });
                console.log(arg);
            },
            datesSet: (arg: DatesSetArg) => {
                if (
                    dateStart == null ||
                    dayjs(arg.start).isBefore(dateStart.value) ||
                    dayjs(arg.end).isAfter(dateEnd.value)
                ) {
                    dateStart.value = arg.start;
                    dateEnd.value = arg.end;
                    store.dispatch(
                        "calendarEvent/" + ACTIONS.FETCH_CALENDAR_EVENTS,
                        {
                            start: arg.startStr,
                            end: arg.endStr,
                        }
                    );
                }
                console.log(arg);
            },
            eventsSet: (args: EventApi[]) => {
                console.log(args);
            },
            eventAdd: (arg: EventAddArg) => {
                console.log(arg);
            },
            eventChange: (arg: EventChangeArg) => {
                let oldEvent = calendarEventsRef.value.find(
                    (x) => x.id == arg.event.id
                );
                store.dispatch(
                    "calendarEvent/" + ACTIONS.UPDATE_CALENDAR_EVENT,
                    {
                        ...oldEvent,
                        ...{
                            start: arg.event.start,
                            end: arg.event.end,
                        },
                    }
                );
                console.log(arg);
            },
            eventRemove: (arg: EventRemoveArg) => {
                console.log(arg);
            },
            windowResize: (arg: { view: ViewApi }) => {
                console.log(arg);
            },
            eventMouseEnter: (arg: EventHoveringArg) => {
                console.log(arg);
            },
            eventMouseLeave: (arg: EventHoveringArg) => {
                console.log(arg);
            },
            unselect: (arg: DateUnselectArg) => {
                console.log(arg);
            },
            loading: (isLoading: boolean) => {
                console.log(isLoading);
            },
            moreLinkClick: (arg: MoreLinkArg) => {
                console.log(arg);
            },
        });

        return { options, calendarRef, calendarEventsRef, store };
    },
    watch: {
        calendarEvents: {
            handler(val) {
                this.mapCalendarEvents();
            },
            deep: true,
        },
        calendarMap() {
            this.mapCalendarEvents();
        },
    },
    data() {
        return {
            eventDetailVisible: false,
        };
    },
    mounted() {
        this.FETCH_CALENDARS();
    },
    methods: {
        ...mapActions("calendarEvent", ACTIONS),
        ...mapActions("calendar", CALENDAR_ACTIONS),
        mapCalendarEvents() {
            if (
                this.calendarEvents?.length > 0 &&
                Object.keys(this.calendarMap).length > 0
            ) {
                this.calendarEventsRef = this.calendarEvents.map((x: any) => {
                    const calendar = this.calendarMap[x.calendarId] ?? {
                        color: "",
                        borderColor: "",
                        bgColor: "",
                    };
                    return {
                        id: x.id,
                        title: x.title,
                        start: x.start,
                        end: x.end,
                        allDay: x.isAllDay,
                        textColor: "#" + calendar.color,
                        borderColor: "#" + calendar.borderColor,
                        backgroundColor: "#" + calendar.bgColor,
                        classNames: [],
                        editable: true,
                        startEditable: true,
                        durationEditable: true,
                        resourceEditable: true,
                        calendarEvent: x,
                        // url: "",
                    };
                });
            }
        },
        closeEvent() {
            this.store.commit("calendarEvent/" + MUTATION.CLOSE_CALENDAR_EVENT);
        },
    },
});
</script>


<style lang="scss" scoped>
:deep(.fc-header-toolbar) {
    margin: 1.5em 0.5em;
}
:deep(.fc-more-popover) {
    z-index: 100;
}
</style>