import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "../Menu/Menu";
import styles from "./ListPageEffects.module.scss";
import * as actions from "../actions";

class ListPageEffects extends Component<any, any> {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Menu />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPageEffects);
