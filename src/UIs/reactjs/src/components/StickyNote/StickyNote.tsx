
import styles from "./StickyNote.module.scss";
import React, { Component } from 'react'

export default class StickyNote extends Component<any, any> {
  render() {
    return (
      <div className={`${styles.sticky} ${styles.taped}`}>
        <strong>{this.props.title}</strong><br />
        {this.props.children}
      </div>
    )
  }
}