import React, { PureComponent } from 'react'
import styles from './ValueChart.module.scss'

const d3 = require("d3")

type Props = {
    id: string,
    data: { k: Array<string>; yz: Array<Array<number>>; n: number; },
    unit: number,
}
console.log("ValueChart");

export default class ValueChart extends PureComponent<Props> {
    svg: any;
    componentDidMount() {
        let {
            svg,
            props: {
                data,
                unit,
            },
        } = this;

        var margin = { top: 1, right: 1, bottom: 4, left: 6 },
            width = 100,
            height = 35;
        svg = d3.select(`#${this.props.id}`)
            .attr("viewBox", [0, 0, width, height]);
        let n = data.n; // number of series
        // let m = data.k.length; // number of values per series
        let xz = data.k // the x-values shared by all series
        let yz = data.yz // the y-values of each of the n series
        let y01z = d3.stack()
            .keys(d3.range(n))
            (d3.transpose(yz)) // stacked yz
            .map((data, i) => data.map(([y0, y1]) => [y0, y1, i]));
        let y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
        let y1Min = d3.min(y01z, y => d3.min(y, d => d[1]));
        // [y1Min, y1Max] 等價 d3.extent(y01z.reduce((a, b) => a.concat(b.map(x =>x[1])), []))
        let x = d3.scaleBand()
            .domain(xz)
            .rangeRound([margin.left, width - margin.right])
            .padding(0.08);
        let y = d3.scaleLinear()
            .domain([y1Min, y1Max])
            .range([height - margin.bottom, margin.top]);
        let z = d3.scaleSequential(d3.interpolateBlues)
            .domain([-0.5 * n, 1.5 * n]);

        let xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(1).tickPadding(1).tickFormat(x => x));

        let yAxis = d3.axisLeft(y)
            .tickSizeOuter(0)
            .tickSize(1)
            .tickPadding(1)
            .ticks(5)
            .tickFormat(x => x / unit);

        const rect = svg.selectAll("g")
            .data(y01z)
            .join("g")
            .attr("fill", (d, i) => z(i))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", y(0))
            .attr("width", x.bandwidth())
            .attr("height", 0);

        svg.append("g")
            .attr("class", styles.axis)
            .call(xAxis)
            // .selectAll("text")
            // .attr("y", "2") // 用 tickPadding取代
            ;

        svg.append("g")
            .attr("class", styles.axis)
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis)
            // .selectAll("text")
            // .attr("x", "-2") // 用 tickPadding取代
            ;

        rect.transition()
            .duration(500)
            .delay((d, i) => i * 20)
            .attr("x", (d, i) => x(xz[i]) + x.bandwidth() / n * d[2])
            .attr("width", x.bandwidth() / n)
            .transition()
            .attr("y", d => (d[1] - d[0]) > 0 ? y(d[1] - d[0]) : y(0))
            .attr("height", d => Math.abs(y(0) - y(d[1] - d[0])));

        rect.append("title")
            .attr("fill", "black")
            .text(d => (d[1] - d[0]) / unit);

        //補上文字
        // svg.append("g")
        //     .attr("class", styles.rectText)
        //     .selectAll("g")
        //     .data(y01z.reduce((a, b) => a.concat(b), []))
        //     .join("text")
        //     .attr("fill", "#000")
        //     .attr("x", (d, i) => {
        //         console.log(d, i);
        //         return x(xz[Math.floor(i % xz.length)]) + x.bandwidth() / n * d[2]
        //     })
        //     .attr("y", d => y(d[1] - d[0]))
        //     .text(d => (d[1] - d[0]) / unit);

        // svg.selectAll("rect")
        //     .data(y01z)
        //     .join("text")
        //     .attr("fill", "#000")
        //     .attr("y", d => d[1] - d[0] > 0 ? y(d[1] - d[0]) : y(0))
        //     .attr("x", (d, i) => x(xz[i]) + x.bandwidth() / n * d[2])
        //     .attr("dy", ".35em")
        //     .text(x => x[1]);

        // y.domain([y1Min, y1Max]);

        // rect.transition()
        //     .duration(500)
        //     .delay((d, i) => i * 20)
        //     .attr("y", d => y(d[1]))
        //     .attr("height", d => y(d[0]) - y(d[1]))
        //     .transition()
        //     .attr("x", (d, i) => x(xz[i]))
        //     .attr("width", x.bandwidth());
    }

    render() {
        return (
            <div className={styles.container}>
                <svg id={this.props.id}>
                </svg>
            </div>
        )
    }

}
