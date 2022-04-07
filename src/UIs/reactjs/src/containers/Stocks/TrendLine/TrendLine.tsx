import dayjs from 'dayjs';
import React, { PureComponent } from 'react'
import styles from './TrendLine.module.scss'

const d3 = require("d3")

type Props = {
    id: string,
    data: Array<any>,
    width?: number,
    height?: number,
    margin?: { top?: number; right?: number; bottom?: number; left?: number; },
}
console.log("TrendLine");

export default class TrendLine extends PureComponent<Props> {
    svg: any;
    data: any[] = [];
    dataMap: {} = {};
    margin: { top: number; right: number; bottom: number; left: number; } = { ...(this.props.margin || {}), top: 1, right: 1, bottom: 1, left: 1, };
    width: number = this.props.width || 100;
    height: number = this.props.height || 50;
    componentDidMount() {
        const {
            width, height,
        } = this;

        this.data = this.props.data.filter(x => x.closePrice > 0).map((x) => { return { ...x, date: new Date(x.date) }; });
        this.dataMap = this.data.reduce((p, c) => {
            return {
                ...p,
                [c.date]: c,
            }
        }, {});
        this.svg = d3.select(`#${this.props.id}`)
            .attr("width", width)
            .attr("height", height);

        this.appendPrices();
        this.appendVolumes();
        this.appendLines();
    }
    private appendLines() {
        const {
            margin, width, height, data, dataMap,
        } = this;
        const self = this;
        let lines = data.map(x => { return { x: x.date, y1: x.closePrice, y2: x.dealAmount } });

        let scaleX = d3.scaleBand()
            .domain(lines.map(x => x.x))
            .range([margin.left, width - margin.right]);
        scaleX.invert = function (x) {
            var domain = scaleX.domain()
            var range = scaleX.range()
            var scale = d3.scaleQuantize().domain(range).range(domain)
            return scale(x)
        }

        let maxY1 = d3.max(lines, o => o.y1);
        let minY1 = d3.min(lines, o => o.y1);
        let scaleY1 = d3.scaleLinear()
            .domain([minY1, maxY1]).nice()
            .range([height - margin.bottom, margin.top]);

        let maxY2 = d3.max(lines, o => o.y2);
        let minY2 = d3.min(lines, o => o.y2);
        let scaleY2 = d3.scaleLinear()
            .domain([minY2, maxY2]).nice()
            .range([height - margin.bottom, margin.top]);

        let g = self.svg
            .append("g")
            .attr("class", styles.pointer)
            .call(g => {
                g.append("line").attr("class", "date").attr("y1", margin.top).attr("y2", height - margin.bottom);
                g.append("text").attr("class", `date ${styles.text}`).attr("y", margin.top + 15).attr("text-anchor", "middle");
                g.append("line").attr("class", "volume").attr("x1", margin.left).attr("x2", width - margin.right);
                g.append("text").attr("class", `volume ${styles.text}`).attr("x", width - margin.right).attr("text-anchor", "end");
                g.append("line").attr("class", "price").attr("x1", margin.left).attr("x2", width - margin.right);
                g.append("text").attr("class", `price ${styles.text}`).attr("x", 0);
            });

        self.svg
            .on("pointerover", e => {
                let x = d3.pointer(e)[0];
                let invertDate = scaleX.invert(x);
                let point = dataMap[invertDate];
                console.log(point);
                let _x = scaleX(invertDate) + scaleX.bandwidth() / 2;
                let _y1 = scaleY1(point.closePrice);
                let _y2 = scaleY2(point.dealAmount);
                g.selectAll("line.date")
                    .attr("x1", _x)
                    .attr("x2", _x)
                    .attr("stroke", "currentColor");
                g.selectAll("text.date").attr("x", _x).text(dayjs(invertDate).format("YYYY-MM-DD"));

                g.selectAll("line.price")
                    .attr("y1", _y1)
                    .attr("y2", _y1)
                    .attr("stroke", "currentColor");
                g.selectAll("text.price").attr("y", _y1).text(point.closePrice);

                g.selectAll("line.volume")
                    .attr("y1", _y2)
                    .attr("y2", _y2)
                    .attr("stroke", "currentColor");
                g.selectAll("text.volume").attr("y", _y2).text(point.dealAmount);
            })
            .on("pointerenter", () => {
                g.attr("opacity", 1);
            })
            .on("pointerleave", () => {
                g.attr("opacity", 0);
            });
    }

    private appendPrices() {
        const {
            margin, width, height, data,
        } = this;
        var prices = data.map(x => { return { x: x.date, y: x.closePrice }; });
        var maxY = d3.max(prices, o => o.y);
        var minY = d3.min(prices, o => o.y);

        var scaleX = d3.scaleUtc()
            .domain(d3.extent(prices, d => d.x))
            // .domain([[...data].splice(-60)[0].x, [...data].splice(-1)[0].x])
            .range([margin.left, width - margin.right]);

        var scaleY = d3.scaleLinear()
            .domain([minY, maxY]).nice()
            .range([height - margin.bottom, margin.top]);

        var line = d3.line()
            .x(d => scaleX(d.x))
            .y(d => scaleY(d.y));

        this.appendPath(prices, line);

        // 5 
        this.appendPath(this.avgData(5), line, "red");

        // 10
        this.appendPath(this.avgData(10), line, "deeppink");

        // 20
        this.appendPath(this.avgData(20), line, "green");

        // 60
        this.appendPath(this.avgData(60), line, "steelblue");
    }

    private appendVolumes() {
        const {
            margin,
            width,
            height,
        } = this;
        var volumes = this.data.map(x => { return { y: x.dealAmount, x: x.date } });

        let scaleX = d3.scaleBand()
            .domain(volumes.map(x => x.x))
            .range([margin.left, width - margin.right])
            .padding(0.08);

        let scaleY = d3.scaleLinear()
            .domain([0, d3.max(volumes, d => d.y)]).nice()
            .range([height - margin.bottom, margin.top]);

        this.svg.append("g")
            .attr("class", "bars")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(volumes)
            .join("rect")
            .attr("x", d => scaleX(d.x))
            .attr("y", d => scaleY(d.y))
            .attr("height", d => scaleY(0) - scaleY(d.y))
            .attr("width", scaleX.bandwidth())
            .attr("opacity", 0.5);
    }

    private appendPath(data: { y: any; x: Date; }[], line: any, color: string = "black") {
        this.svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", "1px")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line)
            .on("click", (a, b) => { console.log(a, b) });
    }

    private avgData(num: number) {
        return [...this.data].splice(num)
            .map((o, i) => {
                return { x: o.date, y: [...this.data].splice(i, num).reduce((p, c) => p + c.closePrice, 0) / num };
            });
    }

    render() {
        return (
            <svg id={this.props.id}>
            </svg>
        )
    }

}
