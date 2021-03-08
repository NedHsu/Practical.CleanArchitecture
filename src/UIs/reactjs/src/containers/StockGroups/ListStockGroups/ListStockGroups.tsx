import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";

class ListStockGroups extends Component<any, any> {
  state = {
    pageTitle: "StockGroup List",
    showImage: false,
    showDeleteModal: false,
    deletingStockGroup: {
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
    return this.props.stockgroups.filter(
      (stockgroup) => stockgroup.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "StockGroup List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  viewAuditLogs = (stockgroup) => {
    this.props.fetchAuditLogs(stockgroup);
    this.setState({ showAuditLogsModal: true });
  };

  deleteStockGroup = (stockgroup) => {
    this.setState({ showDeleteModal: true, deletingStockGroup: stockgroup });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockGroup: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStockGroup(this.state.deletingStockGroup);
    this.setState({ showDeleteModal: false, deletingStockGroup: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockGroups();
  }

  render() {
    const filteredStockGroups = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockgroups;

    const rows = filteredStockGroups?.map((stockgroup) => (
      <tr key={stockgroup.id}>
        <td>
          {this.state.showImage ? (
            <img
              src={stockgroup.imageUrl || logo}
              title={stockgroup.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/stockgroups/" + stockgroup.id}>{stockgroup.name}</NavLink>
        </td>
        <td>{stockgroup.code?.toLocaleUpperCase()}</td>
        <td>{stockgroup.description}</td>
        <td>{stockgroup.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={stockgroup.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stockgroups/edit/" + stockgroup.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={() => this.viewAuditLogs(stockgroup)}
          >
            View Audit Logs
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockGroup(stockgroup)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stockgroups ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>StockGroup</th>
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
    const auditLogRows = this.props.auditLogs?.map((auditLog) => (
      <tr key={auditLog.id}>
        <td>{this.formatDateTime(auditLog.createdDateTime)}</td>
        <td>{auditLog.userName}</td>
        <td>{auditLog.action}</td>
        <td style={{ color: auditLog.highLight.code ? "red" : "" }}>
          {auditLog.data.code}
        </td>
        <td style={{ color: auditLog.highLight.name ? "red" : "" }}>
          {auditLog.data.name}
        </td>
        <td style={{ color: auditLog.highLight.description ? "red" : "" }}>
          {auditLog.data.description}
        </td>
      </tr>
    ));
    const auditLogsModal = (
      <Modal
        size="xl"
        show={this.state.showAuditLogsModal}
        onHide={() => this.setState({ showAuditLogsModal: false })}
      >
        <Modal.Body>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Date Time</th>
                  <th>User Name</th>
                  <th>Action</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>{auditLogRows}</tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    );

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete StockGroup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockGroup?.name}</strong>
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
              to="/stockgroups/add"
            >
              Add StockGroup
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
        {auditLogsModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockgroups: state.stockgroup.stockgroups,
    auditLogs: state.stockgroup.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockGroups: () => dispatch(actions.fetchStockGroups()),
    deleteStockGroup: (stockgroup) => dispatch(actions.deleteStockGroup(stockgroup)),
    fetchAuditLogs: (stockgroup) => dispatch(actions.fetchAuditLogs(stockgroup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockGroups);
