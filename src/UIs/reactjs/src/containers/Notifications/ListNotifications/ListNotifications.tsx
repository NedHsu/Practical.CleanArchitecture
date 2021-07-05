import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";

class ListNotifications extends Component<any, any> {
  state = {
    pageTitle: "Notification List",
    showImage: false,
    showDeleteModal: false,
    deletingNotification: {
      name: null
    },
    listFilter: "",
    showAuditLogsModal: false,
  };

  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.notifications.filter(
      (notification) => notification.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "Notification List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  deleteNotification = (notification) => {
    this.setState({ showDeleteModal: true, deletingNotification: notification });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingNotification: null });
  };

  deleteConfirmed = () => {
    this.props.deleteNotification(this.state.deletingNotification);
    this.setState({ showDeleteModal: false, deletingNotification: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const filteredNotifications = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.notifications;

    const rows = filteredNotifications?.map((notification) => (
      <tr key={notification.id}>
        <td>
          {this.state.showImage ? (
            <img
              src={notification.imageUrl || logo}
              title={notification.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/notifications/" + notification.id}>{notification.name}</NavLink>
        </td>
        <td>{notification.code?.toLocaleUpperCase()}</td>
        <td>{notification.description}</td>
        <td>{notification.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={notification.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/notifications/edit/" + notification.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteNotification(notification)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.notifications ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>Notification</th>
            <th>Code</th>
            <th>Description</th>
            <th>Price</th>
            <th>5 Star Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingNotification?.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.deleteCanceled}>
            No
          </Button>
          <Button variant="primary" onClick={this.deleteConfirmed}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        <div className="card">
          <div className="card-header">
            {this.state.pageTitle}
            <NavLink
              className="btn btn-primary"
              style={{ float: "right" }}
              to="/notifications/add"
            >
              Add Notification
            </NavLink>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">Filter by:</div>
              <div className="col-md-4">
                <input
                  type="text"
                  value={this.state.listFilter}
                  onChange={(event) => this.filterChanged(event)}
                />
              </div>
            </div>
            {this.state.listFilter ? (
              <div className="row">
                <div className="col-md-6">
                  <h4>Filtered by: {this.state.listFilter}</h4>
                </div>
              </div>
            ) : null}
            <div className="table-responsive">{table}</div>
          </div>
        </div>
        {this.props.errorMessage ? (
          <div className="alert alert-danger">
            Error: {this.props.errorMessage}
          </div>
        ) : null}
        {deleteModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    auditLogs: state.notification.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: () => dispatch(actions.fetchNotifications()),
    deleteNotification: (notification) => dispatch(actions.deleteNotification(notification)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNotifications);
