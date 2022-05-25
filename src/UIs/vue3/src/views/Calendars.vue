<template>
  <div>
    <Spinner>
      <DataTable :value="calendars" stripedRows responsiveLayout="scroll">
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <h5 class="p-m-0">Calendars</h5>
            <span class="p-input-icon-left">
              <Button
                class="p-button-outlined"
                label="Add"
                @click="addCalendar"
              />
            </span>
          </div>
        </template>
        <Column field="name" header="Name"></Column>
        <Column field="categoryName" header="Category"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="bgColor" header="Bg">
          <template #body="slotProps">
            <div class="color-display" :style="{ backgroundColor: `#${slotProps.data.bgColor}` }"></div>
          </template>
        </Column>
        <Column field="borderColor" header="Border">
          <template #body="slotProps">
            <div class="color-display" :style="{ backgroundColor: `#${slotProps.data.borderColor}` }"></div>
          </template>
        </Column>
        <Column field="color" header="Text">
          <template #body="slotProps">
            <div class="color-display" :style="{ backgroundColor: `#${slotProps.data.color}` }"></div>
          </template>
        </Column>
        <Column field="dragBgColor" header="Drag Bg">
          <template #body="slotProps">
            <div class="color-display" :style="{ backgroundColor: `#${slotProps.data.dragBgColor}` }"></div>
          </template>
        </Column>
        <Column header="Edit">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text p-button-plain"
              @click="editCalendar(slotProps.data.id)"
            />&nbsp;
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-plain"
              @click="deleteCalendar(slotProps.data.id)"
            />
          </template>
        </Column>
        <template #footer
          >In total there are
          {{ calendars ? calendars.length : 0 }} calendars.</template
        >
      </DataTable>
    </Spinner>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { mapActions, mapGetters, mapState, useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default defineComponent({
  computed: {
    ...mapGetters("calendar", [
      // "calendars"
    ]),
    ...mapState("calendar", ["calendars", "loading"]),
  },
  props: {},
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });

    onMounted(() => {
      store.dispatch("calendar/FETCH_CALENDARS").then(() => {
        console.log(store.state.calendar.calendars);
      });
      console.log("onMounted");
    });
    onUnmounted(() => {});
    return { t };
  },
  methods: {
    ...mapActions("calendar", ["FETCH_CALENDARS"]),
    deleteCalendar(id: string) {
      console.log(id);
    },
    addCalendar() {
      this.$router.push({
        name: "CalendarAdd",
      });
    },
    editCalendar(id: string) {
      this.$router.push({
        name: "CalendarEdit",
        params: {
          id: id,
        },
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.color-display {
    width: 30px;
    height: 30px;
}
</style>