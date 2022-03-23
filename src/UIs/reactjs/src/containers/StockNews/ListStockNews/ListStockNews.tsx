import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import * as actions from "../actions";
class ListStockNews extends Component<any, any> {
  state = {
    pageTitle: "StockNew List",
    showImage: false,
    showDeleteModal: false,
    deletingStockNew: {
      name: null
    },
    listFilter: "",
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stockNews.filter(
      (stockNew) => stockNew.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  deleteStockNew = (stockNew) => {
    this.setState({ showDeleteModal: true, deletingStockNew: stockNew });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockNew: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStockNew(this.state.deletingStockNew);
    this.setState({ showDeleteModal: false, deletingStockNew: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockNews();
  }

  render() {
    const filteredStockNews = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockNews;

    const rows = filteredStockNews?.map((stockNew) => (
      <tr key={stockNew.id}>
        <td>
          <NavLink to={"/stockNews/" + stockNew.id}>{stockNew.name}</NavLink>
        </td>
        <td>{stockNew.code?.toLocaleUpperCase()}</td>
        <td>{stockNew.description}</td>
        <td>{stockNew.price || (5).toFixed(2)}</td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stockNews/edit/" + stockNew.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockNew(stockNew)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stockNews ? (
      <table className="table">
        <thead>
          <tr>
            <th>StockNew</th>
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
          <Modal.Title>Delete StockNew</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockNew?.name}</strong>
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
              to="/stockNews/add"
            >
              Add StockNew
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
    stockNews: state.stockNew.stockNews,
    auditLogs: state.stockNew.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockNews: () => dispatch(actions.fetchStockNews()),
    deleteStockNew: (stockNew) => dispatch(actions.deleteStockNew(stockNew)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockNews);
