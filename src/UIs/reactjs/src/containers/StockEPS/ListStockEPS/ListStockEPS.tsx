import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Menu from "../../Stocks/Menu/Menu";
import styles from "./ListStockEPS.module.scss";

import * as actions from "../actions";
import dayjs from "dayjs";
class ListStockEPS extends Component<any, any> {
  state = {
    pageTitle: "StockEPS List",
    showImage: false,
    showDeleteModal: false,
    deletingStockEPS: {
      name: null
    },
    listFilter: "",
    year: dayjs().year() - 1911,
    growthRatio: 1.0,
  };

  filterChanged = (event) => {
    this.setState({ listFilter: event.target.value });
  };

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.props.stockEPSList.filter(
      (stockEPS) => (stockEPS.name + stockEPS.stockCode).toLocaleLowerCase().indexOf(filterBy) !== -1
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
    this.props.fetchStockEPSes({
      year: this.state.year,
      growthRatio: this.state.growthRatio
    });
  }

  render() {
    const filteredStockEPSes = this.state.listFilter
      ? this.performFilter(this.state.listFilter)
      : this.props.stockEPSList;
    const priceDiff = (num, den) => {
      return Math.round((num - den) / den * 10000) / 100;
    };
    const priceClass = (diff) => {
      return diff > 0 ? styles.posText : styles.negText;
    };

    const rows = filteredStockEPSes?.map((stockEPS) => {
      let twentyDiff = priceDiff(stockEPS.twentyPrice, stockEPS.closePrice);
      let sixtyDiff = priceDiff(stockEPS.sixtyPrice, stockEPS.closePrice);
      return (
        <tr key={stockEPS.stockCode}>
          <td>
            <NavLink to={"/stockEPSList/" + stockEPS.stockCode}>({stockEPS.stockCode}){stockEPS.name}</NavLink>
          </td>
          <td>{stockEPS.industry}</td>
          <td>{stockEPS.closePrice}</td>
          <td>
            <div>20: {stockEPS.twentyPrice} / <span className={priceClass(-twentyDiff)}>{Math.abs(twentyDiff)}</span></div>
            <div>60: {stockEPS.sixtyPrice} / <span className={priceClass(-sixtyDiff)}>{Math.abs(sixtyDiff)}</span></div>
          </td>
          <td>
            <div>{stockEPS.year}: <a href="javascript:void(0)">{stockEPS.eps}</a></div>
            <div>{stockEPS.p_Year}: {stockEPS.p_EPS}</div>
          </td>
          <td>
            <div>{stockEPS.pe}</div>
            <div>{stockEPS.p_PE}</div>
          </td>
          <td>
            <NavLink
              className="btn btn-primary"
              to={"/stockEPSList/edit/" + stockEPS.id}
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
      )
    });

    const table = this.props.stockEPSList ? (
      <table className="table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Industry</th>
            <th>Price</th>
            <th>Average</th>
            <th>EPS</th>
            <th>PE</th>
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
            <Menu />
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
              <div className="col"></div>
              <NavLink
                className="btn btn-primary"
                style={{ float: "right", marginRight: "10px", width: "200px" }}
                to="/stockEPSList/add"
              >
                Add StockEPS
              </NavLink>
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
    stockEPSList: state.stockEPS.stockEPSList,
    auditLogs: state.stockEPS.auditLogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStockEPSes: (options) => dispatch(actions.fetchStockEPSes(options)),
    deleteStockEPS: (stockEPS) => dispatch(actions.deleteStockEPS(stockEPS)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStockEPS);
