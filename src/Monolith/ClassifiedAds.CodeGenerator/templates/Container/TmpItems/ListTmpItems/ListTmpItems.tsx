import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";

class ListTmpItems extends Component<any, any> {
  state = {
    pageTitle: "TmpItem List",
    showImage: false,
    showDeleteModal: false,
    deletingTmpItem: {
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
    return this.props.tmpItems.filter(
      (tmpItem) => tmpItem.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "TmpItem List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  deleteTmpItem = (tmpItem) => {
    this.setState({ showDeleteModal: true, deletingTmpItem: tmpItem });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingTmpItem: null });
  };

  deleteConfirmed = () => {
    this.props.deleteTmpItem(this.state.deletingTmpItem);
    this.setState({ showDeleteModal: false, deletingTmpItem: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchTmpItems();
  }

  render() {
    const filteredTmpItems = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.tmpItems;

    const rows = filteredTmpItems?.map((tmpItem) => (
      <tr key={tmpItem.id}>
        <td>
          {this.state.showImage ? (
            <img
              src={tmpItem.imageUrl || logo}
              title={tmpItem.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/tmpItems/" + tmpItem.id}>{tmpItem.name}</NavLink>
        </td>
        <td>{tmpItem.code?.toLocaleUpperCase()}</td>
        <td>{tmpItem.description}</td>
        <td>{tmpItem.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={tmpItem.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/tmpItems/edit/" + tmpItem.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteTmpItem(tmpItem)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.tmpItems ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>TmpItem</th>
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
          <Modal.Title>Delete TmpItem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingTmpItem?.name}</strong>
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
              to="/tmpItems/add"
            >
              Add TmpItem
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
    tmpItems: state.tmpItem.tmpItems,
    auditLogs: state.tmpItem.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTmpItems: () => dispatch(actions.fetchTmpItems()),
    deleteTmpItem: (tmpItem) => dispatch(actions.deleteTmpItem(tmpItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTmpItems);
