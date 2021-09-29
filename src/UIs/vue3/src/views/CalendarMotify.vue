<template>
    <Card>
        <template #title>
            Calendar
            <Divider />
        </template>
        <template #content>
            <div class="p-fluid">
                <div class="p-field p-grid">
                    <label
                        for="calendarName"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Name</label
                    >
                    <div class="p-col-12 p-md-2">
                        <InputText
                            id="calendarName"
                            type="text"
                            v-model="calendar.name"
                        />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="calendarCategory"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Category</label
                    >
                    <div class="p-col-12 p-md-2">
                        <Dropdown
                            inputId="calendarCategory"
                            v-model="calendar.categoryId"
                            :options="categorys"
                            optionLabel="name"
                            optionValue="id"
                            placeholder
                        ></Dropdown>
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="calendarColor"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Color</label
                    >
                    <div class="p-col-12 p-md-1">
                        <ColorPicker
                            id="calendarColor"
                            v-model="calendar.color"
                            defaultColor="ffffff"
                        />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="calendarBgColor"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Bg Color</label
                    >
                    <div class="p-col-12 p-md-1">
                        <ColorPicker
                            id="calendarBgColor"
                            v-model="calendar.bgColor"
                            defaultColor="ffffff"
                        />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="DragBgColor"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Drag Bg Color</label
                    >
                    <div class="p-col-12 p-md-1">
                        <ColorPicker
                            id="DragBgColor"
                            v-model="calendar.dragBgColor"
                            defaultColor="ffffff"
                        />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="calendarBorderColor"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Border Color</label
                    >
                    <div class="p-col-12 p-md-1">
                        <ColorPicker
                            id="calendarBorderColor"
                            v-model="calendar.borderColor"
                            defaultColor="ffffff"
                        />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label
                        for="calendarBorderColor"
                        class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                        >Preview</label
                    >
                    <div class="p-col-12 p-md-1">
                        <span
                            class="calendar-display"
                            :style="{
                                backgroundColor: '#' + calendar.bgColor,
                                borderColor: '#' + calendar.borderColor,
                                color: '#' + calendar.color,
                            }"
                        >
                            {{ calendar.name }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" @click="save" />
            <Button
                icon="pi pi-times"
                label="Cancel"
                class="p-button-secondary"
                style="margin-left: 0.5em"
                @click="cancel"
            />
        </template>
    </Card>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { mapActions, mapState } from "vuex";
import store from "../store";
import ACTIONS from "../store/modules/calendar/actionTypes";

export default defineComponent({
    computed: {
        ...mapState("calendar", {
            calendarStore: "calendar",
            categorys: "calendarCategories",
        }),
    },
    setup() {
        const { t, locale } = useI18n({ useScope: "global" });
        const route = useRoute();

        onMounted(() => {
            if (route.params?.id) {
                store.dispatch("calendar/FETCH_CALENDAR", route.params.id);
            }
        });

        return { t, locale };
    },
    mounted() {
        if (!this.categorys) {
            store.dispatch("calendar/FETCH_CALENDARCATEGORIES", this.locale);
        }
    },
    data() {
        return {
            calendar: {
                id: undefined,
                name: "",
                color: "",
                bgColor: "",
                dragBgColor: "",
                borderColor: "",
                categoryId: 1,
            },
        };
    },
    watch: {
        calendarStore(newValue) {
            Object.assign(this.calendar, newValue);
        },
    },
    methods: {
        ...mapActions("calendar", ACTIONS),
        save() {
            const handler = (p: Promise<any>) => {
                p.then(() => {
                    this.$router.push({
                        name: "Calendars",
                    });
                }).catch((error) => {
                    console.log(error);
                });
            };

            if (!this.calendar.id) {
                handler(this.ADD_CALENDAR(this.calendar));
            } else {
                handler(this.UPDATE_CALENDAR(this.calendar));
            }
        },
        cancel() {
            this.$router.back();
        },
    },
});
</script>
<style lang="scss" scoped>
.calendar-display {
    padding: 1px 5px;
    border: 1px solid;
    border-radius: 3px;
}
</style>