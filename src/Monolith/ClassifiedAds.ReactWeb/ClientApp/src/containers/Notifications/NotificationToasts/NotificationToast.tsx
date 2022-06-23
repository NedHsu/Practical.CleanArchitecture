import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./NotificationToast.module.scss";
import * as actions from "../actions";

class NotificationToast extends Component<any, any> {
  state = {
  };

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.toastContainer}>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationToast);
