import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";

class ListStockMargins extends Component<any, any> {
  state = {
    pageTitle: "StockMargin List",
    showImage: false,
    showDeleteModal: false,
    deletingStockMargin: {
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
    return this.props.stockMargins.filter(
      (stockMargin) => stockMargin.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "StockMargin List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  viewAuditLogs = (stockMargin) => {
    this.props.fetchAuditLogs(stockMargin);
    this.setState({ showAuditLogsModal: true });
  };

  deleteStockMargin = (stockMargin) => {
    this.setState({ showDeleteModal: true, deletingStockMargin: stockMargin });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockMargin: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStockMargin(this.state.deletingStockMargin);
    this.setState({ showDeleteModal: false, deletingStockMargin: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockMargins();
  }

  render() {
    const filteredStockMargins = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockMargins;

    const rows = filteredStockMargins?.map((stockMargin) => (
      <tr key={stockMargin.id}>
        <td>
          {this.state.showImage ? (
            <img
              src={stockMargin.imageUrl || logo}
              title={stockMargin.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/stockMargins/" + stockMargin.id}>{stockMargin.name}</NavLink>
        </td>
        <td>{stockMargin.code?.toLocaleUpperCase()}</td>
        <td>{stockMargin.description}</td>
        <td>{stockMargin.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={stockMargin.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stockMargins/edit/" + stockMargin.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={() => this.viewAuditLogs(stockMargin)}
          >
            View Audit Logs
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockMargin(stockMargin)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stockMargins ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>StockMargin</th>
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
          <Modal.Title>Delete StockMargin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockMargin?.name}</strong>
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
              to="/stockMargins/add"
            >
              Add StockMargin
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
    stockMargins: state.stockMargin.stockMargins,
    auditLogs: state.stockMargin.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockMargins: () => dispatch(actions.fetchStockMargins()),
    deleteStockMargin: (stockMargin) => dispatch(actions.deleteStockMargin(stockMargin)),
    fetchAuditLogs: (stockMargin) => dispatch(actions.fetchAuditLogs(stockMargin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockMargins);
