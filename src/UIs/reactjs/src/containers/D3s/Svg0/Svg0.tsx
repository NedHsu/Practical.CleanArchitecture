import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import * as d3 from 'd3'

import * as actions from "../actions";
import { getRandomInt } from "../../../shared/utility";

class Svg0 extends Component<any, any> {
  state = {
    circles: [{ cx: getRandomInt(500), cy: getRandomInt(500), r: getRandomInt(150) }],
  };

  componentDidMount() {
    const svg = d3.select("#svg0");
    svg.append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r", 50);

    setInterval(() => {
      this.setState({
        circles: Array.from({ length: getRandomInt(10) }, (_, i) => i + 1).map(x => { return { cx: getRandomInt(500), cy: getRandomInt(500), r: getRandomInt(10) } })
      });
    }, 5000);
  }

  render() {
    const circles = this.state.circles.map((x, i) => {
      return (
        <circle key={"c" + i} cx={x.cx} cy={x.cy} r={x.r} />
      )
    })
    return (
      <svg id="svg0" viewBox="0 0 500 500">
        {circles}
      </svg>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Svg0);
