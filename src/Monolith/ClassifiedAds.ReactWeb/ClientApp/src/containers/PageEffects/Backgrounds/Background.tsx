import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Background.module.scss";
import * as actions from "../actions";

class Background extends Component<any, any> {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <div className={`${styles.box} ${styles.bg01}`}></div>
          <div className={`${styles.box} ${styles.bg02}`}></div>
          <div className={`${styles.box} ${styles.bg03}`}></div>
          <div className={`${styles.box} ${styles.bg04}`}></div>
          <div className={`${styles.box} ${styles.bg05}`}></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Background);
