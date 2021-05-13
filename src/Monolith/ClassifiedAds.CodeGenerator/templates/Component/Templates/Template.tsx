import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Template.module.scss";
import * as actions from "../actions";

class Template extends Component<any, any> {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Template);
