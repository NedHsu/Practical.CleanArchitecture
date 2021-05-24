import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const d3 = require("d3")

type Props = {
    id: string,
    data: Array<any>,
}
console.log("TrendLine");

export default class TrendLine extends PureComponent<Props> {
    svg: any;
    data: { y: any; x: Date; }[] = [];
    componentDidMount() {
        var margin = { top: 1, right: 1, bottom: 1, left: 1 },
            width = 100,
            height = 35;
        var data = this.data = this.props.data.filter(x => x.closePrice > 0).map((x, i) => { return { y: x.closePrice, x: new Date(x.date) } })
        var maxY = d3.max(data, o => o.y);
        var minY = d3.min(data, o => o.y);
        this.svg = d3.select(`#${this.props.id}`)
            .attr("width", width)
            .attr("height", height);

        var scaleX = d3.scaleUtc()
            .domain(d3.extent(data, d => d.x))
            // .domain([[...data].splice(-60)[0].x, [...data].splice(-1)[0].x])
            .range([margin.left, width - margin.right])

        var scaleY = d3.scaleLinear()
            .domain([minY, maxY]).nice()
            .range([height - margin.bottom, margin.top])

        var line = d3.line()
            .x(function (d) { return scaleX(d.x); })
            .y(function (d) { return scaleY(d.y); })

        this.appendPath(data, line);

        // 5 
        this.appendPath(this.avgData(5), line, "red");

        // 10
        this.appendPath(this.avgData(10), line, "deeppink");

        // 20
        this.appendPath(this.avgData(20), line, "green");

        // 60
        this.appendPath(this.avgData(60), line, "steelblue");
    }

    private appendPath(data: { y: any; x: Date; }[], line: any, color: string = "black") {
        this.svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);
    }

    private avgData(num: number) {
        return [...this.data].splice(num)
            .map((o, i) => {
                return { x: o.x, y: [...this.data].splice(i, num).reduce((p, c) => p + c.y, 0) / num };
            });
    }

    render() {
        return (
            <svg id={this.props.id}>
            </svg>
        )
    }

}
