import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Transform3D.module.scss";
import * as actions from "../actions";

class Transform3D extends Component<any, any> {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className={styles.layer}>
          <div className={styles.group}>
            <div className={`${styles.face} ${styles.front}`}>front</div>
            <div className={`${styles.face} ${styles.top}`}>top</div>
            <div className={`${styles.face} ${styles.back}`}>back</div>
            <div className={`${styles.face} ${styles.botton}`}>botton</div>
            <div className={`${styles.face} ${styles.right}`}>right</div>
            <div className={`${styles.face} ${styles.left}`}>left</div>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.front}>Front</div>
            <div className={styles.back}>Back</div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>Front</div>
            <div className={styles.back}>Back</div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>Front</div>
            <div className={styles.back}>Back</div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>Front</div>
            <div className={styles.back}>Back</div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>Front</div>
            <div className={styles.back}>Back</div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Transform3D);
