import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";

class ListCalendars extends Component<any, any> {
  state = {
    pageTitle: "Calendar List",
    showImage: false,
    showDeleteModal: false,
    deletingCalendar: {
      name: null
    },
    listFilter: "",
  };

  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.calendars.filter(
      (calendar) => calendar.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "Calendar List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  deleteCalendar = (calendar) => {
    this.setState({ showDeleteModal: true, deletingCalendar: calendar });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingCalendar: null });
  };

  deleteConfirmed = () => {
    this.props.deleteCalendar(this.state.deletingCalendar);
    this.setState({ showDeleteModal: false, deletingCalendar: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchCalendars();
  }

  render() {
    const filteredCalendars = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.calendars;

    const rows = filteredCalendars?.map((calendar) => (
      <tr key={calendar.id}>
        <td>
          {this.state.showImage ? (
            <img
              src={calendar.imageUrl || logo}
              title={calendar.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/calendars/" + calendar.id}>{calendar.name}</NavLink>
        </td>
        <td>{calendar.code?.toLocaleUpperCase()}</td>
        <td>{calendar.description}</td>
        <td>{calendar.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={calendar.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/calendars/edit/" + calendar.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteCalendar(calendar)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.calendars ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>Calendar</th>
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
          <Modal.Title>Delete Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingCalendar?.name}</strong>
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
              to="/calendars/add"
            >
              Add Calendar
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
    calendars: state.calendar.calendars,
    auditLogs: state.calendar.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCalendars: () => dispatch(actions.fetchCalendars()),
    deleteCalendar: (calendar) => dispatch(actions.deleteCalendar(calendar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCalendars);
