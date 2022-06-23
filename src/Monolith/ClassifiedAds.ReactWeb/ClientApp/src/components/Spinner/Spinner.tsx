import { Component } from "react";
import styles from "./Spinner.module.scss";

export default class Spinner extends Component<any, any> {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const {
      props
    } = this;
    return (
      <div className={props.fullscreen ? styles.fullscreen : styles.container} hidden={!props.fullscreen || !props.loading}>
        <div className={styles.inner}>{props.children}</div>
        <div className={styles.mask} hidden={!props.loading}></div>
        <div className={styles.icon} hidden={!props.loading}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={styles.svg} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g>
              <circle cx="60" cy="50" r="4" fill="#e15b64">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
              </circle>
              <circle cx="60" cy="50" r="4" fill="#e15b64">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
              </circle>
              <circle cx="60" cy="50" r="4" fill="#e15b64">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
              </circle>
            </g><g transform="translate(-15 0)">
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)"></path>
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
              </path>
              <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
              </path>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}