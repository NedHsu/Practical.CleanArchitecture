import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import logo from "../../../logo.svg";
import * as actions from "../actions";
import Star from "../../../components/Star/Star";

class ListStockDays extends Component<any, any> {
  state = {
    pageTitle: "StockDay List",
    showImage: false,
    showDeleteModal: false,
    deletingStockDay: {
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
    return this.props.stockdays.filter(
      (stockday) => stockday.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "StockDay List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockDays();
  }

  render() {
    const filteredStockDays = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockdays;

    const rows = filteredStockDays?.map((stockday) => (
      <tr key={stockday.id}>
        <td>
          {this.state.showImage ? (
            <img
              src={stockday.imageUrl || logo}
              title={stockday.name}
              style={{ width: "50px", margin: "2px" }}
            />
          ) : null}
        </td>
        <td>
          <NavLink to={"/stockdays/" + stockday.id}>{stockday.name}</NavLink>
        </td>
        <td>{stockday.code?.toLocaleUpperCase()}</td>
        <td>{stockday.description}</td>
        <td>{stockday.price || (5).toFixed(2)}</td>
        <td>
          <Star
            rating={stockday.starRating || 4}
            ratingClicked={(event) => this.onRatingClicked(event)}
          ></Star>
        </td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stockdays/edit/" + stockday.id}
          >
            Edit
          </NavLink>
        </td>
      </tr>
    ));

    const table = this.props.stockdays ? (
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="btn btn-primary" onClick={this.toggleImage}>
                {this.state.showImage ? "Hide" : "Show"} Image
              </button>
            </th>
            <th>StockDay</th>
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

    return (
      <div>
        <div className="card">
          <div className="card-header">
            {this.state.pageTitle}
            <NavLink
              className="btn btn-primary"
              style={{ float: "right" }}
              to="/stockdays/add"
            >
              Add StockDay
            </NavLink>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label style={{ marginRight: 10 }}>Filter by:</label>
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
        {auditLogsModal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stockdays: state.stockday.stockdays,
    auditLogs: state.stockday.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockDays: () => dispatch(actions.fetchStockDays({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockDays);
