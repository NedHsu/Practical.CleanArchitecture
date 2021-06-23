import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class ViewChat extends Component<any, any> {
  state = {
    tmpItem: {
      id: "",
      name: "",
      message: "",
    },
    submitted: false,
    errorMessage: null
  };

  componentDidMount() {
    const {
      props: {
        connection,
        connectChat,
      },
    } = this;
    console.log(connection);
    if (!connection) {
      connectChat();
    }
    // this.props.fetchChat(this.props.match.params.id);
  }

  back = () => {
    this.props.history.push("/tmpItems");
  };

  render() {
    const {
      state: {
        tmpItem
      },
      props: {
        messages
      }
    } = this;

    const messageBox = messages?.length > 0 ? messages.map(x => (
      <div key={x.time}>
        {x.username}: {x.message}
      </div>
    )) : null;

    const page = tmpItem ? (
      <div className="card">
        <div className="card-header">
          {"Chat Detail: " + tmpItem.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{tmpItem.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{tmpItem.message}</div>
              </div>
            </div>

            <div className="col-md-4">
            </div>
          </div>
          {messageBox}
        </div>

        <div className="card-footer">
          <button
            className="btn btn-outline-secondary"
            onClick={this.back}
            style={{ width: "80px" }}
          >
            <i className="fa fa-chevron-left"></i> Back
          </button>
          &nbsp;
          <NavLink
            className="btn btn-primary"
            to={"/tmpItems/edit/" + tmpItem.id}
          >
            Edit
          </NavLink>
        </div>
      </div>
    ) : null;
    return page;
  }
}

const mapStateToProps = state => {
  return {
    connection: state.chat.connection,
    messages: state.chat.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    connectChat: () => dispatch(actions.connectChat())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewChat);
