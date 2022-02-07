import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import * as actions from "../actions";
class ListStockEPS extends Component<any, any> {
  state = {
    pageTitle: "StockEPS List",
    showImage: false,
    showDeleteModal: false,
    deletingStockEPS: {
      name: null
    },
    listFilter: "",
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stockEPSes.filter(
      (stockEPS) => stockEPS.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  deleteStockEPS = (stockEPS) => {
    this.setState({ showDeleteModal: true, deletingStockEPS: stockEPS });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockEPS: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStockEPS(this.state.deletingStockEPS);
    this.setState({ showDeleteModal: false, deletingStockEPS: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockEPSes();
  }

  render() {
    const filteredStockEPSes = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockEPSes;

    const rows = filteredStockEPSes?.map((stockEPS) => (
      <tr key={stockEPS.id}>
        <td>
          <NavLink to={"/stockEPSes/" + stockEPS.id}>{stockEPS.name}</NavLink>
        </td>
        <td>{stockEPS.code?.toLocaleUpperCase()}</td>
        <td>{stockEPS.description}</td>
        <td>{stockEPS.price || (5).toFixed(2)}</td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stockEPSes/edit/" + stockEPS.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockEPS(stockEPS)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stockEPSes ? (
      <table className="table">
        <thead>
          <tr>
            <th>StockEPS</th>
            <th>Code</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete StockEPS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockEPS?.name}</strong>
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
              to="/stockEPSes/add"
            >
              Add StockEPS
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
    stockEPSes: state.stockEPS.stockEPSes,
    auditLogs: state.stockEPS.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockEPSes: () => dispatch(actions.fetchStockEPSes()),
    deleteStockEPS: (stockEPS) => dispatch(actions.deleteStockEPS(stockEPS)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockEPS);
