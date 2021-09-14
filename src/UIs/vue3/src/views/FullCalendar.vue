<template>
    <FullCalendar :options="options" :events="eventTest" ref="calendarRef" />
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
import { mapState, useStore } from "vuex";
import ACTIONS from "../store/modules/calendarEvent/actionTypes";

export default defineComponent({
    components: {
        FullCalendar,
    },
    computed: {
        ...mapState("calendarEvent", ["calendarEvents"]),
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
            await store.dispatch(
                "calendarEvent/" + ACTIONS.FETCH_CALENDAR_EVENTS
            );
        });

        return { options, calendarRef, calendarEventsRef };
    },
    watch: {
        calendarEvents(newVal) {
            console.log(newVal);
            this.calendarEventsRef = newVal.map((x: any) => {
                return {
                    id: x.id,
                    title: x.title,
                    start: x.start,
                    end: x.end,
                };
            });
        },
    },
    data() {
        return {
            eventTest: [
                { id: 1, title: "All Day Event", start: "2017-02-01" },
                {
                    id: 2,
                    title: "Long Event",
                    start: "2017-02-07",
                    end: "2017-02-10",
                },
                {
                    id: 3,
                    title: "Repeating Event",
                    start: "2017-02-09T16:00:00",
                },
                {
                    id: 4,
                    title: "Repeating Event",
                    start: "2017-02-16T16:00:00",
                },
                {
                    id: 5,
                    title: "Conference",
                    start: "2017-02-11",
                    end: "2017-02-13",
                },
                {
                    id: 6,
                    title: "Meeting",
                    start: "2017-02-12T10:30:00",
                    end: "2017-02-12T12:30:00",
                },
                { id: 7, title: "Lunch", start: "2017-02-12T12:00:00" },
                { id: 8, title: "Meeting", start: "2017-02-12T14:30:00" },
                {
                    id: 9,
                    title: "Happy Hour",
                    start: "2017-02-12T17:30:00",
                },
                { id: 10, title: "Dinner", start: "2017-02-12T20:00:00" },
                {
                    id: 11,
                    title: "Birthday Party",
                    start: "2017-02-13T07:00:00",
                },
                {
                    id: 12,
                    title: "Click for Google",
                    url: "https://www.google.com/",
                    start: "2017-02-28",
                },
            ],
        };
    },
});
</script>
<style lang="scss" scoped>
</style>