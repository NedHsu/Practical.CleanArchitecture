import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Transition.module.scss";
import * as actions from "../actions";

class Transition extends Component<any, any> {
  state = {
  };
  hourHand: React.RefObject<HTMLDivElement>;
  minHand: React.RefObject<HTMLDivElement>;
  secHand: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.hourHand = React.createRef();
    this.minHand = React.createRef();
    this.secHand = React.createRef();
  }

  componentDidMount() {
    this.initClock();
  }

  initClock() {
    const date = new Date();

    const hours = ((date.getHours() + 11) % 12 + 1);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const setRotate = (el, seconds) => {
      if (el) {
        el.style.animationDelay = `-${seconds}s`;
      }
    }

    const minuteSeconds = minutes * 60 + seconds;

    setRotate(this.hourHand.current, hours * 60 * 60 + minuteSeconds);
    setRotate(this.minHand.current, minuteSeconds);
    setRotate(this.secHand.current, seconds);
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.clock}>
            <div className={styles.clockInner}>
              <div className={styles.dot}></div>
              <div ref={this.hourHand} className={styles.hourHand}></div>
              <div ref={this.minHand} className={styles.minHand}></div>
              <div ref={this.secHand} className={styles.secHand}></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Transition);
