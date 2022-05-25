<template>
    <div class="container">
        <div class="left-tools">
            <Menu :model="menuItems" />
        </div>
        <div :class="{ tinder: true, loaded: !loading }" ref="containerRef">
            <div class="tinder-status">
                <i class="fa fa-remove"></i>
                <i class="fa fa-heart"></i>
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
                                <p>
                                    <Tag severity="success">
                                        {{ item.partOfSpeach }}
                                    </Tag>
                                    {{ item.description }}
                                </p>
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
                />
                <Button
                    icon="pi pi-volume-up"
                    class="p-button-rounded p-button-warning"
                    @click="speech"
                />
                <Button
                    icon="pi pi-times"
                    class="p-button-rounded p-button-danger"
                    @click="nope"
                />
                <Button
                    icon="pi pi-check"
                    class="p-button-rounded p-button-success"
                    @click="love"
                />
                <Button
                    icon="pi pi-heart"
                    class="p-button-rounded p-button-help"
                    @click="speech"
                />
                <Button
                    icon="pi pi-step-forward-alt"
                    class="p-button-rounded p-button-info"
                    @click="next"
                />
            </div>
        </div>
        <div class="recent-board">
            <Panel header="Recent">
                <ul>
                    <li
                        v-for="(item, index) in recentWords"
                        :key="index"
                        :class="recentClass(item)"
                    >
                        {{ item.text }}
                    </li>
                </ul>
            </Panel>
        </div>
    </div>
</template>
<script lang="ts">
import { onBeforeUpdate, onUpdated, reactive, ref } from "vue";
import { createNamespacedHelpers } from "vuex";
import Hammer from "hammerjs";
import { WordStats } from "../../store/modules/word/types";

const { mapState, mapActions, mapMutations, mapGetters } =
    createNamespacedHelpers("word");

export default {
    setup() {
        const moveOutWidth = document.body.clientWidth * 1.5;
        let itemRefs: any[] = reactive([]);
        const containerRef = ref<HTMLElement>();
        const setItemRef = (el: HTMLElement) => {
            if (el) {
                itemRefs.push(el);
            }
        };

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
            console.log(itemRefs);
            initCards();
        });

        return {
            setItemRef,
            itemRefs,
            containerRef,
            initCards,
            moveOutWidth,
        };
    },
    mounted() {
        this.next();
        this.FETCH_WORD_STATS_RECENT();
    },
    data() {
        return {
            pageSize: 10,
            pageIndex: 1,
            menuItems: [
                {
                    label: "Words",
                    items: [
                        {
                            label: "Add",
                            icon: "pi pi-book",
                            command: () => {
                                this.$router.push({
                                    name: "Words",
                                });
                            },
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        ...mapState(["word", "recentWords", "loading"]),
        ...mapGetters(["wordStatsItems", "wordStats"]),
        wordLength(): number {
            return this.wordStatsItems.length;
        },
    },
    methods: {
        flipCard(e: PointerEvent) {
            if (e.target instanceof Element) {
                e.target.parentElement?.classList.toggle("back");
            }
        },
        love(event: PointerEvent) {
            this.UPDATE_WORD_STATS(true);
            event.preventDefault();
        },
        nope(event: PointerEvent) {
            this.UPDATE_WORD_STATS(false);
            event.preventDefault();
        },
        next() {
            const { FETCH_WORD_STATS_PAGED, pageSize, pageIndex } = this;

            FETCH_WORD_STATS_PAGED({
                pageSize: pageSize,
                pageIndex: pageIndex,
            });
        },
        previous() {
            this.REVIEW_WORD_STATS();
        },
        speech() {
            const audio = new Audio(require(`./${this.wordStats.audioFile}`));
            audio.play();
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
        ]),
        ...mapMutations(["REVIEW_WORD_STATS"]),
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

                containerRef?.classList.toggle("tinder_love", event.deltaX > 0);
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
                containerRef?.classList.remove("tinder_love");
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
.container {
    display: flex;
    background: #e9ecef;
    .left-tools {
        float: left;
    }
}
.recent-board {
    float: right;
    .positive {
        color: forestgreen;
    }
    .negative {
        color: maroon;
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

.tinder_love .fa-heart {
    opacity: 0.7;
    transform: scale(1);
}

.tinder_nope .fa-remove {
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
    flex: 0 0 100px;
    text-align: center;
    padding-top: 20px;
}

.tinder-buttons button {
    margin: 0 8px;
}
.tinder-buttons button:focus {
    outline: 0;
}
</style>