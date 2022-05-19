<template>
    <div class="container">
        <div class="left-tools">
            Tools
            <Button @click="addWord">Add</Button>
        </div>
        <div class="tinder" ref="containerRef">
            <div class="tinder-status">
                <i class="fa fa-remove"></i>
                <i class="fa fa-heart"></i>
            </div>

            <div class="tinder-cards">
                <div
                    class="tinder-card"
                    v-for="item in words"
                    :key="item.id"
                    :ref="setItemRef"
                >
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <p>
                                    {{ item.text }}
                                </p>
                            </div>
                            <div class="flip-card-back">
                                <p>
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tinder-buttons">
                <button @click="nope">N</button>
                <button @click="love">Y</button>
            </div>
        </div>
        <div class="recent-board">
            Recent
        </div>
    </div>
</template>
<script lang="ts">
import { onBeforeUpdate, onUpdated, ref } from "vue";
import { createNamespacedHelpers } from "vuex";
import Hammer from "hammerjs";

const { mapState, mapActions } = createNamespacedHelpers("word");

export default {
    setup() {
        let itemRefs: HTMLElement[] = [];
        const containerRef = ref<HTMLElement>();
        const setItemRef = (el: HTMLElement) => {
            itemRefs.push(el);
        };

        onBeforeUpdate(() => {
            itemRefs = [];
        });

        onUpdated(() => {
            console.log(itemRefs);
        });
        return {
            setItemRef,
            itemRefs,
            containerRef,
        };
    },
    mounted() {
        const { containerRef, initCards } = this;
        this.itemRefs.forEach((el, i) => {
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
        initCards();
    },
    data() {
        return {
            words: [
                {
                    id: "1",
                    text: "tetexttexttexttexttexttexttextxt text text text texttexttexttext",
                    description: "description",
                },
                {
                    id: "2",
                    text: "text2",
                    description: "description2",
                },
                {
                    id: "3",
                    text: "text3",
                    description: "description3",
                },
            ],
        };
    },
    computed: {
        ...mapState(["word"]),
        wordLength(): number {
            return this.words.length;
        },
    },
    methods: {
        love(event: PointerEvent) {
            this.ok(event, true);
        },
        nope(event: PointerEvent) {
            this.ok(event, false);
        },
        ok(event: PointerEvent, love: boolean) {
            const { initCards } = this;
            const activeCards = this.itemRefs.filter(
                (x) => !x.classList.contains("removed")
            );
            var moveOutWidth = document.body.clientWidth * 1.5;

            if (!activeCards.length) return false;

            var card = activeCards[0];

            card.classList.add("removed");

            if (love) {
                card.style.transform =
                    "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
            } else {
                card.style.transform =
                    "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
            }

            initCards();

            event.preventDefault();
        },
        initCards() {
            const { containerRef, wordLength } = this;
            const activeCards = this.itemRefs.filter(
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
            containerRef?.classList.add("loaded");
        },
        flipCard(e: PointerEvent) {
            if (e.target instanceof Element) {
                e.target.parentElement?.classList.toggle("back");
            }
        },
        addWord() {
            this.$router.push({
                name: "Words",
            });
        },
    },
};
/* 
allCards.forEach(function (el) {
    var hammertime = new Hammer(el);

    hammertime.on("pan", function (event) {
        el.classList.add("moving");
    });

    hammertime.on("pan", function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        tinderContainer.classList.toggle("tinder_love", event.deltaX > 0);
        tinderContainer.classList.toggle("tinder_nope", event.deltaX < 0);

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
        el.classList.remove("moving");
        tinderContainer.classList.remove("tinder_love");
        tinderContainer.classList.remove("tinder_nope");

        var moveOutWidth = document.body.clientWidth;
        var keep =
            Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

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

function createButtonListener(love: any) {
    return function (event: { preventDefault: () => void }) {
        var cards = document.querySelectorAll(".tinder-card:not(.removed)");
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        var card = cards[0];

        card.classList.add("removed");

        if (love) {
            card.style.transform =
                "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
        } else {
            card.style.transform =
                "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
        }

        initCards();

        event.preventDefault();
    };
}
*/
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    background: #bbb;
    .left-tools {
        float: left;
    }
    .recent-board {
        float: right;
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
    height: 100vh;
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
    align-items: flex-end;
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
    border-radius: 50%;
    line-height: 60px;
    width: 60px;
    border: 0;
    background: #ffffff;
    display: inline-block;
    margin: 0 8px;
}

.tinder-buttons button:focus {
    outline: 0;
}

.tinder-buttons i {
    font-size: 32px;
    vertical-align: middle;
}

.fa-heart {
    color: #fface4;
}

.fa-remove {
    color: #cdd6dd;
}
</style>