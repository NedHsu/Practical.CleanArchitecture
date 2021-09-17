<template>
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
    ViewApi,
} from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { mapGetters, mapState, useStore } from "vuex";
import ACTIONS from "../store/modules/calendarEvent/actionTypes";
import CALENDAR_ACTIONS from "../store/modules/calendar/actionTypes";
import EventDetail from "../components/calendar/EventDetail.vue";
import EventEditor from "../components/calendar/EventEditor.vue";

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
        const calendarEventsRef = ref([]);
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
                    "calendarEvent/OPEN_CALENDAR_EVENT",
                    arg.event.extendedProps.calendarEvent
                );
                console.log(arg);
            },
            select: (arg: DateSelectArg) => {
                console.log(arg);
            },
            datesSet: (arg: DatesSetArg) => {
                console.log(arg);
            },
            eventsSet: (args: EventApi[]) => {
                console.log(args);
            },
            eventAdd: (arg: EventAddArg) => {
                console.log(arg);
            },
            eventChange: (arg: EventChangeArg) => {
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
        });

        onMounted(async () => {
            store.dispatch("calendar/" + CALENDAR_ACTIONS.FETCH_CALENDARS);
            store.dispatch("calendarEvent/" + ACTIONS.FETCH_CALENDAR_EVENTS);
        });

        return { options, calendarRef, calendarEventsRef, store };
    },
    watch: {
        calendarEvents() {
            this.mapCalendarEvents();
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
    methods: {
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
            this.store.commit("calendarEvent/CLOSE_CALENDAR_EVENT");
        },
    },
});
</script>


<style lang="scss">

</style>