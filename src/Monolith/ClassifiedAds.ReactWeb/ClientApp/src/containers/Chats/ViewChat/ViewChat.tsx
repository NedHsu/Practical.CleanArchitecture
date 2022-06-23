import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as notificationActions from "../../Notifications/actions";
import { Button, Col, Form, Row } from "react-bootstrap";

class ViewChat extends Component<any, any> {
  state = {
    messageItem: {
      id: "",
      name: "",
      message: "",
    },
    message: "",
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
    if (!connection) {
      connectChat();
    }
    // this.props.fetchChat(this.props.match.params.id);
  }

  back = () => {
    this.props.history.push("/messageItems");
  };

  render() {
    const {
      state: {
        messageItem,
        message,
      },
      props: {
        messages,
        sendNotification,
        sendMessage,
        connection,
      }
    } = this;
    const messageBox = messages?.length > 0 ? messages.map(x => (
      <div key={x.key}>
        {x.username}: {x.message}
      </div>
    )) : null;

    const page = messageItem ? (
      <div className="card">
        <div className="card-header">
          {"Chat Detail: " + messageItem.name}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">Name:</div>
                <div className="col-md-8">{messageItem.name}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Code:</div>
                <div className="col-md-8">{messageItem.message}</div>
              </div>
            </div>

            <div className="col-md-4">
            </div>
          </div>
          {messageBox}
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Message..." name="message" value={message} onChange={(event) => { this.setState({ [event.target.name]: event.target.value }) }} />
            </Col>
            <Col>
              <Button variant="primary" type="submit" onClick={() => {
                sendNotification({ content: message });
                sendMessage(connection, { content: message });
              }}>
                Submit
              </Button>
            </Col>
          </Row>
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
            to={"/messageItems/edit/" + messageItem.id}
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
    connectChat: () => dispatch(actions.connectChat()),
    sendNotification: (notification) => dispatch(notificationActions.sendNotification(notification)),
    sendMessage: (connection, chatItem) => dispatch(actions.sendMessage(connection, chatItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewChat);
