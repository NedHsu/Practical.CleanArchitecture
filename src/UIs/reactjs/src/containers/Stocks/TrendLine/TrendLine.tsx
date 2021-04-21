import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

type Props = {
    id: string,
    data: Array<any>,
}

export default class TrendLine extends PureComponent<Props> {
    componentDidMount() {
        var margin = { top: 1, right: 1, bottom: 1, left: 1 },
            width = 100 - margin.left - margin.right,
            height = 25 - margin.top - margin.bottom;
        var data = this.props.data.map((x, i) => { return { y: x.closePrice, x: i } })
        var maxY = d3.max(data, x => x.y);
        var minY = d3.min(data, x => x.y);
        var maxX = 0;
        var minX = data.length;

        var svg = d3.select(`#${this.props.id}`);
        svg.attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var scaleX = d3.scaleLinear()
            .range([0, width])
            .domain([minX, maxX])

        var scaleY = d3.scaleLinear()
            .range([0, height])
            .domain([minY, maxY])

        var line = d3.line()
            .x(function (d) { return scaleX(d[0]); })
            .y(function (d) { return scaleY(d[1]); })

    }

    render() {
        return (
            <svg id={this.props.id}>
            </svg>
        )
    }
}
