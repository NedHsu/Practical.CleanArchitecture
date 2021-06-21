import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Menu from "../../Stocks/Menu/Menu";

import styles from "./ListStockSeminars.module.scss";
import * as actions from "../actions";
import dayjs from "dayjs";

class ListStockSeminars extends Component<any, any> {
  state = {
    pageTitle: "StockSeminar List",
    showDeleteModal: false,
    deletingStockSeminar: {
      name: null
    },
    listFilter: "",
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stockSeminars.filter(
      (stockSeminar) => (stockSeminar.name + stockSeminar.stockCode).toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked = (event) => {
    const pageTitle = "StockSeminar List: " + event;
    this.setState({ pageTitle: pageTitle });
  };

  deleteStockSeminar = (stockSeminar) => {
    this.setState({ showDeleteModal: true, deletingStockSeminar: stockSeminar });
  };

  deleteCanceled = () => {
    this.setState({ showDeleteModal: false, deletingStockSeminar: null });
  };

  deleteConfirmed = () => {
    this.props.deleteStockSeminar(this.state.deletingStockSeminar);
    this.setState({ showDeleteModal: false, deletingStockSeminar: null });
  };

  formatDateTime = (value) => {
    if (!value) return value;
    var date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  componentDidMount() {
    this.props.fetchStockSeminars({
      startDate: dayjs().add(-7, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
    });
  }

  render() {
    const filteredStockSeminars = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockSeminars;

    const rows = filteredStockSeminars?.map((stockSeminar, i) => (
      <tr key={`stockSeminar-${i}`}>
        <td>
          <NavLink to={"/stocks/" + stockSeminar.stockCode}>({stockSeminar.stockCode}){stockSeminar.name}</NavLink>
        </td>
        <td>{dayjs(stockSeminar.date).format("MMM/DD hh:mm A")}</td>
        <td>{stockSeminar.place}</td>
        <td>{stockSeminar.message}</td>
        <td></td>
        <td>
          <NavLink
            className="btn btn-primary"
            to={"/stockSeminars/edit/" + stockSeminar.id}
          >
            Edit
          </NavLink>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary btn-danger"
            onClick={() => this.deleteStockSeminar(stockSeminar)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    const table = this.props.stockSeminars ? (
      <table className={`table ${styles.table}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Place</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    ) : null;

    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.deleteCanceled}>
        <Modal.Header closeButton>
          <Modal.Title>Delete StockSeminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <strong> {this.state.deletingStockSeminar?.name}</strong>
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
            <Menu />
            <NavLink
              className="btn btn-primary"
              style={{ float: "right" }}
              to="/stockSeminars/add"
            >
              Add StockSeminar
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
    stockSeminars: state.stockSeminar.stockSeminars,
    auditLogs: state.stockSeminar.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockSeminars: (options) => dispatch(actions.fetchStockSeminars(options)),
    deleteStockSeminar: (stockSeminar) => dispatch(actions.deleteStockSeminar(stockSeminar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockSeminars);
