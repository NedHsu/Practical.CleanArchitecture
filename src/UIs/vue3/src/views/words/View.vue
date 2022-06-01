<template>
    <div class="grid grid-nogutter container">
        <div class="col-3 tools">
            <PanelMenu
                :model="menuItems"
                class="tool"
                :expandedKeys="expandedKeys"
            />
            <Panel header="Settings" class="tool">
                <InputNumber
                    v-model="intervalMins"
                    prefix="Over  "
                    suffix="  mins"
                    :min="0"
                    :max="99999"
                />
                <ToggleButton
                    v-model="autoPlay"
                    onLabel="Auto Play"
                    offLabel="Mute"
                    onIcon="pi pi-volume-up"
                    offIcon="pi pi-volume-off"
                />
            </Panel>
        </div>
        <div
            :class="{ tinder: true, loaded: !wordsLoading, col: true }"
            ref="containerRef"
        >
            <div
                :class="{
                    'tinder-status': true,
                    tinder_ok: loved == true,
                    tinder_like: loved == 'like',
                    tinder_unlike: loved == 'unlike',
                    tinder_nope: loved == false,
                }"
            >
                <i class="pi pi-times"></i>
                <i class="pi pi-heart-fill"></i>
                <i class="pi pi-heart"></i>
                <i class="pi pi-thumbs-up"></i>
            </div>

            <div class="tinder-cards">
                <div
                    :class="{
                        'tinder-card': true,
                        removed: item.ok !== undefined,
                    }"
                    v-for="(item, i) in wordStatsItems"
                    :key="i"
                    :ref="setItemRef"
                    :style="{
                        transform:
                            `translate(${item.ok ? '' : '-'}` +
                            moveOutWidth +
                            `px, -100px) rotate(${item.ok ? '-' : ''}30deg)`,
                    }"
                >
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <p>
                                    <span>
                                        <h1>
                                            {{ item.text }}
                                        </h1>
                                    </span>
                                </p>
                            </div>
                            <div class="flip-card-back">
                                <div class="edit">
                                    <Button v-if="item.customId"
                                        icon="pi pi-undo"
                                        class="p-button-rounded p-button-text"
                                        @click="DEL_WORD_CUSTOM(item.customId)"
                                    />
                                    <Button
                                        icon="pi pi-pencil"
                                        class="p-button-rounded p-button-text"
                                        @click="OPEN_WORD_MODAL"
                                    />
                                </div>
                                <p>
                                    <Tag severity="success">
                                        {{ item.partOfSpeech }}
                                    </Tag>
                                    {{ item.description }}
                                </p>
                                <div class="stats">
                                    <span class="correct"
                                        ><i class="pi pi-thumbs-up"></i>
                                        {{ item.correct }}</span
                                    >
                                    <span class="wrong"
                                        ><i class="pi pi-thumbs-down"></i>
                                        {{ item.wrong }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tinder-buttons">
                <Button
                    icon="pi pi-history"
                    class="p-button-rounded p-button-secondary"
                    @click="previous"
                    v-tooltip="'Review recent words\npress \'a\''"
                />
                <Button
                    icon="pi pi-volume-up"
                    class="p-button-rounded p-button-warning"
                    @click="speech"
                    v-tooltip="'Speech\npress \'v\''"
                />
                <Button
                    icon="pi pi-times"
                    class="p-button-rounded p-button-danger"
                    @click="(e) => love(false, e)"
                    v-tooltip="'I don\'t know\npress \'d\''"
                />
                <Button
                    icon="pi pi-check"
                    class="p-button-rounded p-button-success"
                    @click="(e) => love(true, e)"
                    v-tooltip="'I got it\npress \'f\''"
                />
                <Button
                    icon="pi pi-heart-fill"
                    class="p-button-rounded p-button-help"
                    @click="favorite"
                    v-tooltip="'Add to favorite\npress \'g\''"
                />
                <Button
                    icon="pi pi-step-forward-alt"
                    class="p-button-rounded p-button-info"
                    @click="next"
                    v-tooltip="'More words\npress \'s\''"
                />
            </div>
        </div>
        <div class="col-3 recent-board">
            <Panel header="Recent">
                <ul>
                    <li
                        v-for="(item, index) in recentWords"
                        :key="index"
                        :class="recentClass(item)"
                        @click="popRecentWord(item)"
                    >
                        {{ item.text }}
                    </li>
                </ul>
            </Panel>
            <div class="stats-bar">
                <div
                    class="correct"
                    :style="{ width: correctPercentage + '%' }"
                >
                    {{ correct }}
                </div>
                <div class="wrong">{{ wrong }}</div>
            </div>
        </div>
    </div>
    <Spinner :loading="wordsLoading" :fullscreen="true" />
    <Toast position="bottom-right" group="br" />
    <WordEditor />
</template>
<script lang="ts">
import { onBeforeUpdate, onUpdated, reactive, ref } from "vue";
import { createNamespacedHelpers } from "vuex";
import Hammer from "hammerjs";
import { WordStats } from "../../store/modules/word/types";
import { useRouter } from "vue-router";
import WordEditor from "../../components/words/WordEditor.vue";

const { mapState, mapActions, mapMutations, mapGetters } =
    createNamespacedHelpers("word");

export default {
    components: {
        WordEditor,
    },
    setup() {
        const moveOutWidth = document.body.clientWidth * 1.5;
        let itemRefs: any[] = reactive([]);
        let autoPlay = ref(true);
        let intervalMins = ref(30);
        const containerRef = ref<HTMLElement>();
        const router = useRouter();
        const setItemRef = (el: HTMLElement) => {
            if (el) {
                itemRefs.push(el);
            }
        };

        const menuItems = [
            {
                key: "w",
                label: "Words",
                items: [
                    {
                        key: "w_1",
                        label: "Edit",
                        icon: "pi pi-book",
                        command: () => {
                            router.push({
                                name: "Words",
                            });
                        },
                    },
                    {
                        key: "w_2",
                        label: "History",
                        icon: "pi pi-history",
                        command: () => {
                            router.push({
                                name: "WordHistory",
                            });
                        },
                    },
                ],
            },
        ];

        const initCards = () => {
            const wordLength = itemRefs.length;
            const activeCards = itemRefs.filter(
                (x) => !x.classList.contains("removed")
            );
            activeCards.forEach((card, index) => {
                card.style.zIndex = wordLength - index + "";
                card.style.transform =
                    "scale(" +
                    (20 - index) / 20 +
                    ") translateY(-" +
                    30 * index +
                    "px)";
                card.style.opacity = (10 - index) / 10 + "";
            });
        };

        onBeforeUpdate(() => {
            itemRefs = reactive([]);
        });

        onUpdated(() => {
            initCards();
        });

        return {
            setItemRef,
            itemRefs,
            containerRef,
            initCards,
            moveOutWidth,
            menuItems,
            autoPlay,
            intervalMins,
        };
    },
    async mounted() {
        this.expandedKeys = this.menuItems.reduce((p, n) => {
            return { [n.key]: true, ...p };
        }, {});
        this.FETCH_WORD_STATS_RECENT();
        await this.next();
        this.first = false;
        document.addEventListener("keypress", this.keyHandler);
    },
    unmounted() {
        document.removeEventListener("keypress", this.keyHandler);
    },
    data() {
        return {
            expandedKeys: {},
            pageSize: 10,
            pageIndex: 1,
            first: true,
            loved: null as "like" | "unlike" | boolean | null,
        };
    },
    computed: {
        ...mapState([
            "word",
            "recentWords",
            "loading",
            "wordsLoading",
            "correct",
            "wrong",
        ]),
        ...mapGetters(["wordStatsItems", "wordStats"]),
        wordLength(): number {
            return this.wordStatsItems.length;
        },
        correctPercentage(): number {
            const total = this.correct + this.wrong;
            return total <= 0 ? 50 : Math.ceil((this.correct / total) * 100);
        },
    },
    methods: {
        flipCard(e: PointerEvent) {
            if (e.target instanceof Element) {
                e.target.parentElement?.classList.toggle("back");
            }
        },
        popRecentWord(word: WordStats) {
            this.POP_WORD_STATS(word);
        },
        love(ok: boolean, event?: PointerEvent) {
            if (!this.wordStats) return;
            this.setStatus(ok);
            this.UPDATE_WORD_STATS({ ok: ok }).then(() => {
                this.loved = null;
            });
            event?.preventDefault();
            if (this.autoPlay) {
                this.speech();
            }
        },
        async next() {
            const {
                FETCH_WORD_STATS_PAGED,
                pageSize,
                pageIndex,
                intervalMins,
            } = this;

            await FETCH_WORD_STATS_PAGED({
                pageSize,
                pageIndex,
                intervalMins,
            });
            if (!this.first && this.autoPlay) {
                this.speech();
            }
        },
        previous() {
            this.REVIEW_WORD_STATS();
        },
        speech(file?: string) {
            file =
                file ?? this.wordStats?.audioFile
                    ? this.wordStats.audioFile.split(",")[0]
                    : "";
            if (!file) {
                return;
            }

            const url = new URL(`../../assets/audio/${file}`, import.meta.url)
                .href;
            const audio = new Audio(url);
            audio.play();
        },
        favorite() {
            if (!this.wordStats) return;
            this.setStatus(this.wordStats.isFav ? "like" : "unlike");
            this.UPDATE_WORD_STATS({ isFav: !this.wordStats.isFav });
        },
        copy() {
            if (!this.wordStats) return;
            const text = (this.wordStats.text as string).replaceAll(
                /[^a-zA-Z.]+/g,
                ""
            );
            navigator.clipboard.writeText(text).then(() => {
                this.$toast.add({
                    severity: "success",
                    summary: "Text Coppied!",
                    detail: text,
                    group: "br",
                    life: 3000,
                });
            });
        },
        setStatus(loved: "like" | "unlike" | boolean) {
            this.loved = loved;
            setTimeout(() => {
                this.loved = null;
            }, 500);
        },
        keyHandler(e: KeyboardEvent) {
            if (!e) {
                return;
            }

            const { love, next, previous, favorite, speech, copy } = this;
            switch (e.key) {
                case "f":
                    love(true);
                    break;
                case "d":
                    love(false);
                    break;
                case "g":
                    favorite();
                    break;
                case "s":
                    next();
                    break;
                case "a":
                    previous();
                    break;
                case "v":
                    speech();
                    break;
                case "c":
                    copy();
                    break;
            }
            e.preventDefault();
        },
        recentClass(item: WordStats) {
            const v = item.correct - item.wrong;
            if (v === 0) {
                return "";
            }
            return v > 0 ? "positive" : "negative";
        },
        ...mapActions([
            "FETCH_WORD_STATS_PAGED",
            "UPDATE_WORD_STATS",
            "FETCH_WORD_STATS_RECENT",
            "DEL_WORD_CUSTOM",
        ]),
        ...mapMutations([
            "REVIEW_WORD_STATS",
            "OPEN_WORD_MODAL",
            "POP_WORD_STATS",
        ]),
    },
    watch: {},
    updated() {
        const { containerRef, initCards, itemRefs } = this;

        itemRefs.forEach((el, i) => {
            var hammertime = new Hammer(el);

            hammertime.on("pan", function (event) {
                if (event.target !== el) return;
                el.classList.add("moving");
            });

            hammertime.on("pan", function (event) {
                if (event.target !== el) return;
                if (event.deltaX === 0) return;
                if (event.center.x === 0 && event.center.y === 0) return;

                containerRef?.classList.toggle("tinder_like", event.deltaX > 0);
                containerRef?.classList.toggle("tinder_nope", event.deltaX < 0);

                var xMulti = event.deltaX * 0.03;
                var yMulti = event.deltaY / 80;
                var rotate = xMulti * yMulti;

                event.target.style.transform =
                    "translate(" +
                    event.deltaX +
                    "px, " +
                    event.deltaY +
                    "px) rotate(" +
                    rotate +
                    "deg)";
            });

            hammertime.on("panend", function (event) {
                if (event.target !== el) return;
                el.classList.remove("moving");
                containerRef?.classList.remove("tinder_like");
                containerRef?.classList.remove("tinder_nope");

                var moveOutWidth = document.body.clientWidth;
                var keep =
                    Math.abs(event.deltaX) < 80 ||
                    Math.abs(event.velocityX) < 0.5;

                event.target.classList.toggle("removed", !keep);

                if (keep) {
                    event.target.style.transform = "";
                } else {
                    var endX = Math.max(
                        Math.abs(event.velocityX) * moveOutWidth,
                        moveOutWidth
                    );
                    var toX = event.deltaX > 0 ? endX : -endX;
                    var endY = Math.abs(event.velocityY) * moveOutWidth;
                    var toY = event.deltaY > 0 ? endY : -endY;
                    var xMulti = event.deltaX * 0.03;
                    var yMulti = event.deltaY / 80;
                    var rotate = xMulti * yMulti;

                    event.target.style.transform =
                        "translate(" +
                        toX +
                        "px, " +
                        (toY + event.deltaY) +
                        "px) rotate(" +
                        rotate +
                        "deg)";
                    initCards();
                }
            });
        });
    },
};
</script>
<style lang="scss" scoped>
$wrong-color: var(--red-600);
$correct-color: var(--green-600);

.container {
    background: #e9ecef;
    min-height: calc(100vh - 20px);
}
.tools {
    .tool {
        width: 100%;
    }
}
.recent-board {
    .positive {
        color: $correct-color;
    }
    .negative {
        color: $wrong-color;
    }
    li {
        cursor: pointer;
    }
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
    background-color: transparent;
    width: 100%;
    height: 100%;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    p {
        position: inherit;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .stats {
        position: inherit;
        bottom: 1rem;
        left: 50%;
        transform: translate(-50%, -50%);
        span {
            padding: 0 1rem;
        }
    }
    .edit {
        position: inherit;
        top: 0;
        right: 0;
        Button {
            color: #fff;
        }
    }
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
    background-color: #fff;
    color: black;
}

/* Style the back side */
.flip-card-back {
    background-color: dodgerblue;
    color: #fff;
    transform: rotateY(180deg);
}

.tinder {
    width: 100vw;
    height: calc(70vh + 140px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    opacity: 1;
    transition: opacity 0.1s ease-in-out;
}

.tinder-status {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    z-index: 2;
    width: 100%;
    text-align: center;
    pointer-events: none;
}

.tinder-status i {
    font-size: 100px;
    opacity: 0;
    transform: scale(0.3);
    transition: all 0.2s ease-in-out;
    position: absolute;
    width: 100px;
    margin-left: -50px;
}

.tinder_like .pi-heart-fill,
.tinder_unlike .pi-heart-fill,
.tinder_nope .pi-times,
.tinder_ok .pi-thumbs-up {
    opacity: 0.7;
    transform: scale(1);
}

.tinder-cards {
    flex-grow: 1;
    padding-top: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
}

.tinder-card {
    display: inline-block;
    width: 90vw;
    max-width: 400px;
    height: 70vh;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    will-change: transform;
    transition: all 0.3s ease-in-out;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
    border: 0.0625rem solid #f1f1f1;
    background: rgb(255, 255, 255);
}

.moving.tinder-card {
    transition: none;
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
}

// .tinder-card div {
//     pointer-events: none;
// }

.tinder-buttons {
    flex: 0 0 90px;
    text-align: center;
    padding-top: 20px;
}

.tinder-buttons button {
    margin: 0 8px;
}
.tinder-buttons button:focus {
    outline: 0;
}
.stats-bar {
    display: flex;
    color: white;
    div {
        padding: 0.2rem;
    }
    .correct {
        background-color: $correct-color;
        -webkit-transition: width 0.5s ease-in-out;
        -moz-transition: width 0.5s ease-in-out;
        -o-transition: width 0.5s ease-in-out;
        transition: width 0.5s ease-in-out;
    }
    .wrong {
        width: fit-content;
        background-color: $wrong-color;
        flex-grow: 1;
        flex-basis: 0;
    }
}
</style>