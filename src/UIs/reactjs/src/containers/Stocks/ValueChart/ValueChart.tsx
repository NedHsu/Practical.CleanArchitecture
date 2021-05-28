import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const d3 = require("d3")

type Props = {
    id: string,
    data: { k: Array<string>; yz: Array<Array<number>>; n: number; },
}
console.log("ValueChart");

export default class ValueChart extends PureComponent<Props> {
    svg: any;
    componentDidMount() {
        let {
            svg,
            props: {
                data,
            },
        } = this;

        var margin = { top: 1, right: 1, bottom: 1, left: 1 },
            width = 100,
            height = 35;
        svg = d3.select(`#${this.props.id}`)
            .attr("viewBox", [0, 0, width, height]);
        let n = data.n; // number of series
        let m = data.k.length; // number of values per series
        let xz = data.k // the x-values shared by all series
        let yz = data.yz // the y-values of each of the n series
        let y01z = d3.stack()
            .keys(d3.range(n))
            (d3.transpose(yz)) // stacked yz
            .map((data, i) => data.map(([y0, y1]) => [y0, y1, i]));
        console.log(d3.range(n))
        console.log(y01z)
        let yMax = d3.max(yz, y => d3.max(y));
        let yMin = d3.min(yz, y => d3.min(y));
        let y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
        let y1Min = d3.min(y01z, y => d3.min(y, d => d[1]));
        let x = d3.scaleBand()
            .domain(xz)
            .rangeRound([margin.left, width - margin.right])
            .padding(0.08);
        let y = d3.scaleLinear()
            .domain([y1Min, y1Max])
            .range([height - margin.bottom, margin.top]);
        let z = d3.scaleSequential(d3.interpolateBlues)
            .domain([-0.5 * n, 1.5 * n]);

        let xAxis = svg => svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(() => ""))

        const rect = svg.selectAll("g")
            .data(y01z)
            .join("g")
            .attr("fill", (d, i) => z(i))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", height - margin.bottom)
            .attr("width", x.bandwidth())
            .attr("height", 0);

        svg.append("g")
            .call(xAxis);

        y.domain([yMin, yMax]);

        rect.transition()
            .duration(500)
            .delay((d, i) => i * 20)
            .attr("x", (d, i) => x(xz[i]) + x.bandwidth() / n * d[2])
            .attr("width", x.bandwidth() / n)
            .transition()
            .attr("y", d => d[1] - d[0] > 0 ? y(d[1] - d[0]) : y(0))
            .attr("height", d => Math.abs(y(0) - y(d[1] - d[0])));

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
            <svg id={this.props.id}>
            </svg>
        )
    }

}
