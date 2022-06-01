<template>
    <div>
        <DataTable
            :value="wordStatsItems"
            :loading="wordsLoading"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            stripedRows
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    <h3>History</h3>
                    <div class="buttons">
                        <Button icon="pi pi-refresh" />
                        <ToggleButton
                            v-model="isFav"
                            onLabel="Favorite"
                            offLabel="Favorite"
                            onIcon="pi pi-heart-fill"
                            offIcon="pi pi-heart"
                            @click="onPage({ page: 0 })"
                        />
                    </div>
                </div>
            </template>
            <Column field="text" header="Text"></Column>
            <Column field="partOfSpeech" header="PartOfSpeech"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="progress" header="Progress">
                <template #body="{ data }">
                    <div class="stats">
                        <span class="correct"
                            ><i class="pi pi-thumbs-up"></i>
                            {{ data.correct }}</span
                        >
                        <span class="wrong"
                            ><i class="pi pi-thumbs-down"></i>
                            {{ data.wrong }}</span
                        >
                    </div>
                </template>
            </Column>
            <Column field="updatedDateTime" header="Updated Time">
                <template #body="{ data }">
                    {{ displayFullTime(data.updatedDateTime) }}
                </template>
            </Column>
            <template #footer>
                <div>
                    <Paginator
                        v-model:first="first"
                        :rows="pageSize"
                        :totalRecords="wordStatsPaged.totalCount"
                        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        @page="onPage"
                    >
                    </Paginator>
                </div>
            </template>
        </DataTable>
    </div>
</template>
<script lang="ts">
import { createNamespacedHelpers, useStore } from "vuex";
import { displayFullTime } from "../../utils/date";

const { mapState, mapActions, mapGetters } = createNamespacedHelpers("word");

export default {
    computed: {
        ...mapState([
            "wordStatsPaged",
            "wordsLoading",
            "pageFirst",
            "pageLast",
        ]),
        ...mapGetters(["wordStatsItems"]),
    },
    props: {},
    setup() {
        const store = useStore();

        return {
            store,
        };
    },
    mounted() {
        const { pageSize, pageIndex, isFav } = this;
        this.FETCH_WORD_STATS_RECENT_PAGED({
            pageSize,
            pageIndex,
            isFav,
        });
    },
    data() {
        return {
            pageSize: 20,
            pageIndex: 1,
            isFav: false,
        };
    },
    methods: {
        ...mapActions(["FETCH_WORD_STATS_RECENT_PAGED"]),
        displayFullTime,
        onPage(event: {
            first: number;
            page: number;
            pageCount: number;
            rows: number;
        }) {
            const { pageSize, isFav } = this;
            this.FETCH_WORD_STATS_RECENT_PAGED({
                pageSize,
                pageIndex: event.page + 1,
                isFav,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.stats {
    span {
        width: 3.125rem;
        display: inline-block;
    }
}
.table-header {
    .buttons {
        float: right;
    }
}
</style>